from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from MainFunctions.get_schedule import get_schedule
from MainFunctions.get_schedule_timeinfo import get_schedule_timeinfo

class Text(BaseModel):
    text: str

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/plans/")
async def put_plan(text: Text):
  start_time, finish_time, time_range, wordlist = get_schedule_timeinfo(text.text)
  tlist = [start_time, finish_time, time_range, wordlist]
  result,location = get_schedule(text.text, wordlist)
  resultList = [result,location,tlist]
  return resultList


@app.get("/")
def Hello():
    return {"Hello":"World!"}


# @app.post("/range/")
# async def range(text:Text):
#   start_time, finish_time, time_range, wordlist = get_schedule_timeinfo(text.text)
#   tlist = [start_time, finish_time, time_range, wordlist]
#   return tlist