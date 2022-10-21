# ライブラリのインポート
import requests
import json
import re
import datetime
import spacy
import ginza
from spacy.matcher import Matcher

from Helpers.kansuji2arabic import kansuji2arabic

# APIに接続するための情報
API_Endpoint = 'https://labs.goo.ne.jp/api/chrono'
API_Key = '255dea13cdbd7c2469bbcf617391ec29e1025316a614aa9b5d4bad946dd37300'
headers = {'Content-Type': 'application/json', 'key':API_Key}

def get_schedule_timeinfo(text):

  #time_rangeを抽出
  nlp = spacy.load('ja_ginza')
  doc = nlp(text)
  time_range = None
  matcher = Matcher(nlp.vocab)
  # パターンの定義
  pattern = [{'POS': 'NUM'}, {'LEMMA': '時間'},]
  pattern2 = [{'POS': 'NUM'}, {'LEMMA': '時間'},{'POS': 'NUM'},{'LEMMA': '分'}]
  pattern3 = [{'POS': 'NUM'}, {'LEMMA': '時間'},{'POS': 'ADP'},{'POS': 'NUM'},{'LEMMA': '分'}]
  pattern4 = [{'POS': 'NUM'},{'LEMMA': '分'}]
  # Matcherにパターンを追加
  matcher.add('range', [pattern])
  matcher.add('range_minutes', [pattern2])
  matcher.add('range_minutes_to', [pattern3])
  matcher.add('range_minutes_only', [pattern4])
  # ルールベースマッチングの実行
  time_range_dict = {}
  remove_trlist = []
  for match_id, start, end in matcher(doc):
    string_id = nlp.vocab.strings[match_id]
    inside = kansuji2arabic(str(doc[start:end]))
    remove_trlist.append(str(doc[start:end]))
    pre = []
    pre = re.findall(r"\d+", inside)
    time_range_dict[string_id] = pre

  if "range_minutes_only" in time_range_dict:
    time_range = datetime.timedelta(minutes = int(time_range_dict["range_minutes_only"][0]))
  if "range" in time_range_dict:
    time_range = datetime.timedelta(hours = int(time_range_dict["range"][0]))
  if "range_minutes" in time_range_dict:
    time_range = datetime.timedelta(hours = int(time_range_dict["range_minutes"][0]),minutes = int(time_range_dict["range_minutes"][1]))
  if "range_minutes_to" in time_range_dict:
    time_range = datetime.timedelta(hours = int(time_range_dict["range_minutes_to"][0]),minutes = int(time_range_dict["range_minutes_to"][1]))


  #マッチングした文字列を削除
  new_doc = text
  for word in remove_trlist:
    new_doc = new_doc.replace(word,"")
  

  #goo時刻情報正規化API
  body = {"app_id":API_Key, "sentence":new_doc}
  # API接続の実行
  result = requests.post(API_Endpoint, data=json.dumps(body), headers=headers)
  jsonData = result.json()
  datalist = jsonData['datetime_list']

  wordlist = []
  dtlist = []
  for contens in datalist:
    wordlist.append(contens[0])
    dtlist.append(contens[1])
  
  wordlist.extend(remove_trlist)
  
  dtlist_num = []
  for nums in dtlist:
    pre = []
    preInt = []
    pre = re.findall(r"\d+", nums)
    for stNum in pre:
      preInt.append(int(stNum))
    dtlist_num.append(preInt)

  i = 0
  for list in dtlist_num:
    if len(list) > 3:
      if i == 0:
        time1 = datetime.datetime(*list)
        i = 1
      else:
        time2 = datetime.datetime(*list)
        break
  
  start_time = None
  finish_time = None
  
  
  if 'time1' in locals():
    if 'time2' in locals():
      if time1 > time2:
        start_time = time2
        finish_time = time1
      else:
        start_time = time1
        finish_time = time2
      
      if time_range is None:
        time_range = finish_time - start_time  
    else:
      start_time = time1
      if time_range:
        finish_time = start_time + time_range
  
  return start_time, finish_time, time_range, wordlist
  




