from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
import jwt
from database import Database


app = FastAPI()
db = Database()
db.create_table_user()

class LoginItem(BaseModel):
    username: str
    password: str

@app.post("/register")
async def register_user(login_item: LoginItem):
    data = jsonable_encoder(login_item)
    resp = db.register(data["username"],data["password"])
    if resp:
        return {"message": "success"}
    else:
        return {"message":"error"}

@app.get("/")
def read_root():
    return {"Hello": "World"}



SECRET_KEY = "my_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800

@app.post("/login")
async def login_user(login_item: LoginItem):
    data = jsonable_encoder(login_item)
    if db.user_exist(data["username"]):
        encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        return {'token': encoded_jwt }
    else:
        return {'message': 'Login failed'}