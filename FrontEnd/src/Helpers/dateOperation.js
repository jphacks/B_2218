export const getNowDate = (dt,range) => {
  if(dt.constructor.name === "Date"){
    var Y = dt.getFullYear();
    var M = ('00' + (dt.getMonth()+1)).slice(-2);
    var D = ('00' + dt.getDate()).slice(-2);
  
    if(range === 'd') {
      return D;
    }else if(range === 'md') {
      return M +'/' + D;
    }else{
      return Y +'/'+ M +'/' + D;
    }

  }else{
    return "No Date!"
  }
  
};

export const getAfterNdays = (n, range) => {
  var dt = new Date();
  dt.setDate(dt.getDate()+n);
  return getNowDate(dt,range);
};

export const getNowTime = (dt, range) => {
  if(dt.constructor.name === "Date"){
    const h = ("00" + dt.getHours()).slice(-2)
    const m = ("00" + dt.getMinutes()).slice(-2)
    const s = ("00" + dt.getSeconds()).slice(-2)

    if(range === 'h') {
      return h;
    }else if(range === 'hm') {
      return h +':' + m;
    }else{
      return h +':'+ m +':' + s;
    }
  }else{
    return 'noDate'
  }
}

export const normalizYear = (dt) => {
  if(dt.constructor.name === "Date"){
    let yrange = 2022 -1970
    let now = new Date()
    if(dt.getFullYear === 1970){
      dt.setFullYear(now.getFullYear)
    }
    return dt
  }else{
    return 'noDate'
  }
}

export const msecToTime = (msec) => {
  const s = Math.floor(msec/1000)%60
  const m = Math.floor(msec/1000/60)%60;
  const h = Math.floor(msec/1000/60/60)%24;

  return h +':'+ m +':' + s;
}