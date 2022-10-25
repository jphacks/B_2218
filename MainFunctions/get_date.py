import requests
import json

# APIに接続するための情報
API_Endpoint = 'https://labs.goo.ne.jp/api/chrono'
API_Key = '255dea13cdbd7c2469bbcf617391ec29e1025316a614aa9b5d4bad946dd37300'
headers = {'Content-Type': 'application/json', 'key':API_Key}

def get_date(text):
  #goo時刻情報正規化API
  body = {"app_id":API_Key, "sentence":text}
  # API接続の実行
  result = requests.post(API_Endpoint, data=json.dumps(body), headers=headers)
  jsonData = result.json()
  datalist = jsonData['datetime_list']
  dtlist = []
  for contens in datalist:
    dtlist.append(contens[1])
  
  date = dtlist[0]

  return date