# ライブラリのインポート
import re
import datetime
import spacy
import ginza
from spacy.matcher import Matcher
from Helpers.kansuji2arabic import kansuji2arabic

def remove_range(text):

  #time_rangeを抽出
  nlp = spacy.load('ja_ginza_electra')
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
  
  
  return new_doc, remove_trlist, time_range
  
  




