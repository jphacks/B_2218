def lookahead(iterable):
  it = iter(iterable)
  # ループを一個進めておいて、lastに最初の値を代入
  last = next(it)
  # secondとthirdを取り出す
  for val in it:
      yield last, True
      # lastに代入
      last = val
  # 最後にyield
  yield last, False