import React, { useState} from "react";
import axios from "axios";

const baseURL = "https://pacific-earth-33925.herokuapp.com/plans/";

const Test = () => {
  const [post, setPost] = useState(null);

  function createPost() {
    axios
      .post(baseURL, {
        text:"まず明日の朝八時から二時間駅前のファミマでバイトがあります"
      })
      .then((response) => {
        setPost(response.data);
        console.log(response.data)
      });
  }
  

  // if (!post) return "No post!"
  return (
    <div>
      {post ? <div>{post[0]}</div> : <button onClick={createPost}>データを取得</button>}
    </div>
  );
}
export default Test;