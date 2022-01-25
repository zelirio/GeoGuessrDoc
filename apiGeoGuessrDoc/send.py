import requests


URLl = "http://127.0.0.1:8000/login"
URLr = "http://127.0.0.1:8000/register"

PARAMS = {
    "username":"lylian",
    "password":"qqqqq"
    }

a = input("1 login - 2 Register")
if int(a) == 2:
    r = requests.post(url = URLr, json = PARAMS)  
    data = r.text
if int(a) == 1:
    r = requests.post(url = URLl, json = PARAMS)  
    data = r.text


print(data)