from email import message
from optparse import Option
from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
import jwt
from database import Database
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Cookie
import string
import random


app = FastAPI()
db = Database()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
SECRET_KEY = "qgifdsouhyjgqlijhdfshuliqjdfgsjhuqilkdsf"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800


class Game(BaseModel):
    gameName: str
    nbrPlayers: str
    nbrRounds: str
    username: str
    jwt: str

class LoginItem(BaseModel):
    username: str
    password: str

class Jwt(BaseModel):
    username: str
    jwt: str

@app.post("/register")
async def register_user(login_item: LoginItem):
    data = jsonable_encoder(login_item)
    print(data)
    encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    resp = db.register(data["username"],data["password"],str(encoded_jwt)[2:-1])
    if resp:        
        return {"message": "success",'token': encoded_jwt }
    else:
        return {"message":"error"}

@app.get("/")
def read_root():
    return {"Hello": "World"}





@app.post("/login")
async def login_user(login_item: LoginItem):
    data = jsonable_encoder(login_item)
    print(data)
    if db.user_auth(data["username"],data["password"]):
        encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        db.update_jwt(data["username"],str(encoded_jwt)[2:-1])
        return { "message" :"success",'token': encoded_jwt }
    else:
        return {'message':"error",'type':'Login failed'}


def is_auth(username,jwt):
    print(db._select_all())
    if db.is_auth(username,jwt):
        return True
    return False

@app.post("/create")
async def create_game(game: Game):
    print("coucou")
    data = jsonable_encoder(game)
    print(data)
    auth = is_auth(data["username"],data["jwt"])
    if not auth:
        return {"message": "error", "type": "not auth"}
    
   
    url = ''.join(random.choices(string.digits + string.ascii_letters, k=20))
    db.insert_game(url, data["gameName"], data["nbrPlayers"], data["nbrRounds"])
    print(url)
    return {"url": url, "message": "success"}