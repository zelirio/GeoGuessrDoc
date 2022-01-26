import sqlite3
import hashlib

from fastapi import Query

class Database:
    def __init__(self) -> None:
        self.con = sqlite3.connect("GeoGuessrDoc.db")

    def create_table_user(self):
        cur  = self.con.cursor()
        query = """CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY,
                    username INTEGER,
                    password INTEGER
                    )"""

        cur.execute(query)
        self.con.commit
        
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

    def register(self,user,password):
        hash = hashlib.sha256(password.encode()).hexdigest()
        cur = self.con.cursor()
        if not self.user_exist(user):
            query = """INSERT INTO users(
                username,
                password
                )VALUES
                (
                    ?,
                    ?
                )
            """
            param = (user,hash)
            cur.execute(query,param)
            self.con.commit()
            return True
        else:
            return False
    def _select_all(self):
        query = "SELECT * FROM users;"
        return self.con.cursor().execute(query).fetchall()

       
