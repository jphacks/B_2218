 export const waitAsync =(conditionCallback, resolve,intervalMillSecond = 10000) =>{
  if(conditionCallback()){
    // 待つまでもなく成立しているパターン用
    resolve();
    return;
  }
  // 条件が成立するまで setInterval でポーリング的なループ
  const intervalId = setInterval(()=>{
    if(!conditionCallback()){
      // 条件関数が false を返した時はループ続行
      return;
    }
    // 条件関数が true を返した時はループ用の interval を消去
    clearInterval(intervalId);
    // 条件関数が true を返した時は resolve 関数を実行
    resolve();
  }, intervalMillSecond)
}