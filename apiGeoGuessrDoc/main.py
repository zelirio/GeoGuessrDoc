from email import message
from optparse import Option
from unittest import result
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
SECRET_KEY = "qgifdsouh"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800


class Game(BaseModel):
    gameName: str
    nbrPlayers: str
    nbrRounds: str
    username: str
    jwt: str

class Manche(BaseModel):
    scores:list
    gameID:str
    nbrRound:str
    username: str
    jwt: str

class LoginItem(BaseModel):
    username: str
    password: str

class GameItem(BaseModel):
    username: str
    jwt: str
    gameID: str

class RoundItem(BaseModel):
    username: str
    jwt: str
    gameID: str
    roundID: str



@app.post("/register")
async def register_user(login_item: LoginItem):
    data = jsonable_encoder(login_item)
    print(data)
    encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    resp = db.register(data["username"],data["password"],str(encoded_jwt))
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
        db.update_jwt(data["username"],str(encoded_jwt))
        return { "message" :"success",'token': encoded_jwt }
    else:
        return {'message':"error",'type':'Login failed'}


def is_auth(username,jwt):
    if db.is_auth(username,jwt):
        return True
    return False

@app.post("/create")
async def create_game(game: Game):
    data = jsonable_encoder(game)
    auth = is_auth(data["username"],data["jwt"])
    if not auth:
        return {"message": "error", "type": "not auth"}
    
   
    url = ''.join(random.choices(string.digits + string.ascii_letters, k=20))
    db.insert_game(url, data["gameName"], data["nbrPlayers"], data["nbrRounds"])
    print(url)
    return {"url": url, "message": "success"}


@app.post("/game/join")
async def get_game_data(gameItem: GameItem):
    data = jsonable_encoder(gameItem)
    auth = is_auth(data["username"],data["jwt"])
    if not auth:
        return {"message": "error", "type": "not auth"}
    
    name,nbrRounds,nbrPlayersMax,nbrPlayers = db.select_game(data["gameID"])[0]  
    if nbrPlayersMax == nbrPlayers:
        return ({"message":"error","type":"Game Full"})
    
    for i in range(1,nbrRounds+1):
        for j in range(1,6):
            db.insert_manche(i, 0, j, data["username"], data["gameID"])
    return {"message": "success","gameName":name}
    # recup nbr rounds verify si max joueur  --> table game
    # increment nbrPlayers --> table game
    # set create nbr round * 5 manches score 0  --> table manche

@app.post("/game/data")
async def get_game_data(gameItem: RoundItem):
    data = jsonable_encoder(gameItem)
    auth = is_auth(data["username"],data["jwt"])
    if not auth:
        return {"message": "error", "type": "not auth"}
    result = db.select_one_round(data["gameID"], int(data["roundID"]))
    rounds = dict()

    for i in result:
        l = list(i)
        if l[0] in rounds:
            rounds[l[0]] += [l[1:]]
        else:
            rounds[l[0]] = [l[1:]]
    l = []
    for i in rounds:
        l += ([[i] +  rounds[i]])

    print(l)
    return {"message":"success","data":l}

@app.post("/game/update")
async def get_game_data(manche: Manche):
    data = jsonable_encoder(Manche)
    auth = is_auth(data["username"],data["jwt"])
    if not auth:
        return {"message": "error", "type": "not auth"}
    #for i in range(1,6):
        #db.update_manche(data["nbrRound"], data[score, mancheNumber, username, url)
    #push and add 5 manches for username