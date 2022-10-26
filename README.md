# おてがるAI秘書

![Introduction](https://user-images.githubusercontent.com/103818070/197893355-f8822643-d420-44b8-a866-d08ad39a9692.JPG)

## 製品概要
### 背景(製品開発のきっかけ、課題等）
日常でやるべきタスクやスケジュールが複数あり、何から手を付けたら良いか分からなくなってしまうことはないでしょうか。
todoリストに書き出してみようにも、タスク管理アプリを使ってみようにも、一人で淡々と文字を書いたり、入力するのは想像以上に手間がかかってしまいます。
また、タスクやスケジュールを確認するためにわざわざカレンダーアプリを見て確認したり、スケジュール帳を開いて確認するのもまたひと手間かかります。

ただ、日々生活している中でタスクやスケジュール管理が必要な場面は多々来ます。
そんな時に思いついたのが秘書の存在であり、「秘書を模したAIにスケジュールを口頭で伝えればタスクの管理を楽にすることが可能ではないのだろうか。」 と考えました。

今回我々が提供する「おてがるAI秘書」 は以上のタスク、スケジュールを登録・管理する際の煩わしい手間を省くことのできるサービスとなっています。
### 製品説明（具体的な製品の説明）
「おてがるAI秘書」では、自然言語処理を用いて、会話形式の自然な文章から課題・予定の登録、さらに一回のアクションで複数の予定の登録を可能することで、従来のスケジュール管理の手間を解消します。
取得のアクションを行うことで、登録した課題・予定を日ごとに一斉取得して表示することが可能です。


  
プロダクトへのリンク：

デモ動画：

プレゼン資料：
### 特長
#### 1. 特長1
- 自然言語処理を活用して、実際に話しているような文章から予定とその時間を抽出します。
#### 2. 特長2
- 相手の呼びかけに答えるように予定を言うことで、本当に人と話しているような感覚で予定、タスク管理が可能です。
#### 3. 特長3
- 一つ一つではなく複数の予定をまとめて登録することが可能です。
### 解決出来ること
- 従来のタスク・スケジュール管理の煩わしさを無くし、秘書に話しかけているような感覚で予定の登録・確認をすることが可能です。
- AIに伝えた言葉から、時間と予定、課題の情報を抽出することが可能です。
### 今後の展望
- 登録した予定や課題などの情報から、今日何をすべきか、どの課題から取り組むべきか、などをAIに提案させます。。
- フレンドになった人同士で簡単に予定を合わせることを可能にします。
### 注力したこと（こだわり等）
- 会話をしているような自然な文章から、いかに時間と予定を正確に抜き出すかというのに注力しました。
- 実際に秘書と会話をしているようにするために、AIの応答の時間を短縮することに注力しました。
- 一回の予定登録アクションで、複数の予定を登録することを可能にしました。
- AI秘書のイントネーションになるべく違和感が出ないようにしました。
- プログラミング、ハッカソン共に初心者グループの参加で、Pitch Dayではトラブルもあり、拙い発表となってしまいましたが、何とか最後まで作り終えました。
## 開発技術
### 活用した技術
#### API・データ
- gooラボ様　時刻情報正規化API
#### フレームワーク・ライブラリ・モジュール
- React
- FastAPI spaCy GiNZA
- FireBase HEROKU
  

#### デバイス

### 独自技術
#### ハッカソンで開発した独自機能・技術
- 会話をしているかのような自然な文章から、時間と予定を正確に抜き出せます。

#### 製品に取り入れた研究内容（データ・ソフトウェアなど）（※アカデミック部門の場合のみ提出必須）
