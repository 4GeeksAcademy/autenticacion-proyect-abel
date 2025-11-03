import os
from datetime import datetime, timedelta
from uuid import uuid4

import jwt

from api.utils import APIException

SECRET = os.getenv("JWT_SECRET", "super-secret")
ALGORITHM = "HS256"


def create_token(user_id, email=None, minutes: int = 60):
    now = datetime.utcnow()
    payload = {
        "sub": user_id,
        "email": email,
        "iat": now,
        "exp": now + timedelta(minutes=minutes),
        "jti": str(uuid4()),
    }
    token = jwt.encode(payload, SECRET, algorithm=ALGORITHM)
    return token


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise APIException("Token caducado", status_code=401)
    except jwt.InvalidTokenError:
        raise APIException("Token no válido", status_code=401)
