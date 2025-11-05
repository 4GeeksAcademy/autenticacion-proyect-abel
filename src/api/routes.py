
from flask import request, jsonify, Blueprint
from api.models import db, User, RevokedToken
from api.utils import APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from api.auth import create_token, verify_token
from api.models import RevokedToken
from datetime import datetime

api = Blueprint('api', __name__)

CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    nombre = data.get('nombre')
    apellidos = data.get('apellidos')
    email = data.get('email')
    password = data.get('password')

    if not nombre or not apellidos or not email or not password:
        raise APIException(
            'nombre, apellidos, email y password son requeridos', status_code=400)

    if User.query.filter_by(email=email).first():
        raise APIException('user already exists', status_code=400)

    user = User()
    user.username = email
    user.nombre = nombre
    user.apellidos = apellidos
    user.email = email
    user.password = generate_password_hash(password)
    user.is_active = True
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'user created'}), 201


@api.route('/token', methods=['POST'])
def token():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        raise APIException('email and password are required', status_code=400)

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        raise APIException('invalid credentials', status_code=401)

    token = create_token(user.id, email=user.email)
    return jsonify({'token': token}), 200


def _get_bearer_token():
    auth = request.headers.get('Authorization', '')
    if not auth:
        return None
    parts = auth.split()
    if parts[0].lower() != 'bearer' or len(parts) != 2:
        return None
    return parts[1]


@api.route('/private', methods=['GET'])
def private():
    token = _get_bearer_token()
    if not token:
        raise APIException('authorization header missing', status_code=401)

    payload = verify_token(token)
    jti = payload.get('jti')
    if jti and RevokedToken.query.filter_by(jti=jti).first():
        raise APIException('token revoked', status_code=401)

    user_id = payload.get('sub')
    user = User.query.get(user_id)
    if not user:
        raise APIException('user not found', status_code=404)

    return jsonify({'message': 'access granted', 'user': user.serialize()}), 200


@api.route('/logout', methods=['POST'])
def logout():
    token = _get_bearer_token()
    if not token:
        raise APIException('authorization header missing', status_code=401)

    try:
        payload = verify_token(token)
    except APIException as err:
        raise

    jti = payload.get('jti')
    if jti and not RevokedToken.query.filter_by(jti=jti).first():
        revoked = RevokedToken()
        revoked.jti = jti
        revoked.created_at = datetime.utcnow()
        db.session.add(revoked)
        db.session.commit()

    return jsonify({'message': 'token revoked'}), 200
