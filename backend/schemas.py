from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    password: str

class User(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    email: str

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    username: Optional[str]
    email: Optional[str]
