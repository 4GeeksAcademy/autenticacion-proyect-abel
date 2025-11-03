from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy import Column
from datetime import datetime

from sqlalchemy import DateTime

db = SQLAlchemy()


class User(db.Model):
    id = Column(db.Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    nombre = Column(String(120), nullable=False)
    apellidos = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(db.String, nullable=False)
    is_active = Column(Boolean(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "email": self.email,
        }


class RevokedToken(db.Model):
    id = Column(db.Integer, primary_key=True)
    jti = Column(String(120), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<RevokedToken {self.jti}>"
