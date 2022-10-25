#ライブラリインポート
import spacy
import ginza
import re
import datetime
from spacy.matcher import Matcher
from Helpers.lookahead import lookahead


def get_schedule(text,wordlist):
  nlp = spacy.load('ja_ginza_electra')
  doc = nlp(text)

  #場所抽出
  location = None
  for ent in doc.ents:
    if ent.label_ == "City":
      location = ent.text
      break
  


  #削除対象表現の追加
  daylist = ["時間","時","日","明日","分","午前","午後","朝","昼","夜","所要時間","予定","思う"]
  daylist.extend(wordlist)
  day_set = set(daylist)

  #不要文節の削除
  result = ''
  for sent in doc.sents:
    for span in ginza.bunsetu_spans(sent):
      flag = True
      for token in span:
        if token.tag_ == "副詞":
            flag = False
        if token.tag_ == "感動詞-一般":
            flag = False
        if token.tag_ == "感動詞-フィラー":
            flag = False
        if token.tag_ == "名詞-固有名詞-地名-一般":
            flag = False
        if token.tag_ == "名詞-普通名詞-副詞可能":
            flag = False
        if token.tag_ == "動詞-非自立可能":
            flag = False
        if token.tag_ == "補助記号-句点":
            flag = False
        if token.lemma_ in day_set:
            flag = False

      if flag:
          result += str(span)
  
  #文末から助詞を削除
  pattern = "^助詞"
  pattern2 = "助動詞"
  final = ""
  doc2 = nlp(result)
  for sent in doc2.sents:
    for token, has_more in lookahead(sent):
      if has_more:
        final += str(token.text)
      else:
        res = re.match(pattern, token.tag_)
        res2 = re.match(pattern2, token.tag_)
        if(res or res2):
            break
        else:
          final += str(token.text)

  return final, location 
  
    
  




