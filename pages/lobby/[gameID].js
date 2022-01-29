import { useRouter } from 'next/router'
import {API_URL} from "../../index.ts";
import React, { useState, useEffect } from 'react';
import Round from '../../components/Round';
import Header from '../../components/Header';



const Post = () => {
  const { query, isReady } = useRouter()
  const { gameID } = query

  console.log(query)

  const [jwt, setJwt] = useState("")
  const [name, setName]  = useState("")
  const [data, setData] = useState("")
  
  /*if (!isReady) {
    return <div>aaaaaa</div>
  }*/

  const fetching = async (name,jwt) => {
    let apiRes = await fetch(`${API_URL}/game/join`,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "username": name,
          "jwt": jwt,
          "gameID": gameID
      })
    });
    
    setData(await apiRes.json())
    console.log(data)
  }

  useEffect(() => {
    // Perform localStorage action
    console.log("avant if")
    console.log(isReady)
    if (isReady) {
      const name = sessionStorage.getItem('user')
      const jwt = sessionStorage.getItem('token')
      console.log(gameID)
      fetching(name,jwt)
      console.log("youpi")
    } 
    
  }, [isReady])

  if (!isReady) {
    return <div>aaaaaa</div>
  }
  
  return (
    <div>
      <Header />
      <Round  gameID={gameID} roundID="1" />
    </div>
     
  );

  


}





export default Post