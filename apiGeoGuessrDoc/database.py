import sqlite3
import hashlib

from fastapi import Query

class Database:
    def __init__(self) -> None:
        self.con = sqlite3.connect("GeoGuessrDoc.db")
        self.create_table_users()
        self.create_table_games()
        self.create_table_manches()


    def create_table_users(self):
        cur  = self.con.cursor()
        query = """CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY,
                    username VARCHAR(10),
                    password VARCHAR(50),
                    jwt TEXT
                    )"""

        cur.execute(query)
        self.con.commit()
    
    def user_exist(self,user):
        cur = self.con.cursor()
        query = """SELECT * FROM users
            WHERE username is  ?
          
        """
        param = (user,)
        data = cur.execute(query,param).fetchall()
        if len(data) == 0:
            return False
        else:
            return True
    def is_auth(self,username,jwt):
        cur = self.con.cursor()
        query = """SELECT * FROM users
            WHERE username = ? AND jwt = ?
          
        """
        param = (username,jwt)
        data = cur.execute(query,param).fetchall()
        if len(data) == 0:
            return False
        else:
            return True
        
    def user_auth(self,user,password):
        hash = hashlib.sha256(password.encode()).hexdigest()
        cur = self.con.cursor()
        query = """SELECT * FROM users
            WHERE username is ? AND password = ?
        """
        param = (user,hash)
        data = cur.execute(query,param).fetchall()
        if len(data) == 0:
            return False
        else:
            return True

    def register(self,user,password,jwt):
        hash = hashlib.sha256(password.encode()).hexdigest()
        cur = self.con.cursor()
        if not self.user_exist(user):
            query = """INSERT INTO users(
                username,
                password,
                jwt
                )VALUES
                (
                    ?,
                    ?,
                    ?
                )
            """
            param = (user,hash,jwt)
            cur.execute(query,param)
            self.con.commit()
            return True
        else:
            return False

    def update_jwt(self,user,jwt):
        cur = self.con.cursor()
        query = """UPDATE users 
                SET jwt = ? 
                WHERE username = ?
            """
        param = (jwt,user)
        cur.execute(query,param)
        self.con.commit()



    def create_table_games(self):
        cur = self.con.cursor()
        query = """CREATE TABLE IF NOT EXISTS games(
            url TEXT PRIMARY KEY,
            name VARCHAR(20),
            nbrRounds INTEGER,
            nbrPlayersMax INTEGER,
            nbrPlayers INTEGER
        )"""
        cur.execute(query)
        self.con.commit()
    def select_game(self,url):
        cur = self.con.cursor()
        query = """SELECT name, nbrRounds, nbrPlayersMax,nbrPlayers FROM games
        WHERE url = ?"""
        param = (url,)
        return cur.execute(query,param).fetchall()
    def insert_game(self,url,name,nbrRounds,nbrPlayers):
        cur = self.con.cursor()
        query = """INSERT INTO games(
            url,
            name,
            nbrRounds,
            nbrPlayersMax,
            nbrPlayers
            ) VALUES(
                ?,
                ?,
                ?,
                ?,
                ?
            )"""
        param = (url,name,nbrRounds,nbrPlayers,0)
        cur.execute(query,param)
        self.con.commit()
    
    def update_game(self,nbrPlayers):
        cur =  self.con.cursor()
        query = """UPDATE games(
            nbrPlayers 
            )SET
            (?)
            """
        param = (nbrPlayers,)
        cur.execute(query,param)
        self.con.commit()

    def create_table_manches(self):
        cur = self.con.cursor()
        query = """CREATE TABLE IF NOT EXISTS manches(
            id INTEGER PRIMARY KEY,
            roundNumber INTEGER,
            score INTEGER,
            mancheNumber INTEGER,
            username VARCHAR(10),
            url TEXT,
            FOREIGN KEY (username)
                REFERENCES users(username),
            FOREIGN KEY (url)
                REFERENCES games(url)
        )"""
        cur.execute(query)
        self.con.commit()
    def select_all_manches(self,url):
        cur = self.con.cursor()
        query = """SELECT username,score ,mancheNumber ,roundNumber FROM manches 
        WHERE url = ?"""
        param = (url,)
        
        return cur.execute(query,param).fetchall()
        
    def select_one_round(self, url, roundID):
        cur = self.con.cursor()
        query = """SELECT username,score ,mancheNumber  FROM manches 
        WHERE url = ? AND roundNumber = ?"""
        param = (url,roundID)

        return cur.execute(query,param).fetchall()

    def insert_manche(self, roundNumber, score, mancheNumber, username, url):
        cur = self.con.cursor()
        query = """ INSERT INTO manches(
            roundNumber, 
            score, 
            mancheNumber, 
            username, 
            url)VALUES(
                ?,
                ?,
                ?,
                ?,
                ?
            )       
         """
        params = (roundNumber, score, mancheNumber, username, url)
        cur.execute(query,params)
        self.con.commit()

    def update_manche(self, roundNumber, score, mancheNumber, username, url):
        cur = self.con.cursor()
        query = """ UPDATE manches(
            roundNumber, 
            score, 
            mancheNumber, 
            username, 
            url)SET(
                ?,
                ?,
                ?,
                ?,
                ?
            )       
         """
        params = (roundNumber, score, mancheNumber, username, url)
        cur.execute(query,params)
        self.con.commit()

    def _select_all(self):
        query = "SELECT * FROM users;"
        return self.con.cursor().execute(query).fetchall()
    def _select_all_manches(self):
        query = "SELECT * FROM manches;"
        return self.con.cursor().execute(query).fetchall()
       
