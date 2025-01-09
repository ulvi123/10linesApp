from sqlalchemy.orm import Session
from app.models.model import User
from fastapi import HTTPException, status
from app.helperFunctions.utils import hash_password

def create_user(db: Session, email: str, password: str):
    db_user = db.query(User).filter(User.email == email).first()
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    db_user = User(email=email, hashed_password=password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()
