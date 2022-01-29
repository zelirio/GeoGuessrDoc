import React, { useState, useEffect } from 'react';
import {API_URL} from "../index.ts";
import PlayerLine from './PlayerLine';
import styles from "./Round.module.css"
import {  CheckIcon } from '@heroicons/react/outline'

const Round = (props) => {
    
    const [jwt, setJwt] = useState("");
    const [name, setName]  = useState("");
    const [data, setData] = useState(undefined);
    console.log(props)

    const fetching_data = async (name, jwt, gameID, roundID) => {
    
      console.log(roundID)
  
      let apiRes = await fetch(`${API_URL}/game/data`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": name,
            "jwt": jwt,
            "gameID": gameID,
            "roundID":roundID
        })
      });
      setData(await apiRes.json())
      console.log(data)  
    }
    
    // ICI
    const handleChange = (event) => {
        setState({
            [event.target.name]: event.target.value
          });
        console.log(this.state)
    }

    const handleSubmit = () => {
      conmouseleave.log("yo")
    }

    useEffect(() => {
      // Perform localStorage action
      setName(sessionStorage.getItem('user'));
      setJwt(sessionStorage.getItem('token'));
     
      console.log(name + jwt)
      fetching_data(name, jwt, props.gameID, props.roundID)   
      console.log(data)
    }, [])


    const items = []
    if(data){
      if(data.data){
        for (const value of data.data) {
          items.push(<PlayerLine playerName = {value[0]} scores = {value.slice(1)}/>)
        }
      }
    }

   

    return (<div>
                <div className={styles.round}>
                    <div className={styles.playerLine}>{items}</div>
                    <div className={styles.line}></div>
                    <form className={styles.form}>
                      <p className={styles.label}>Enter your score here</p>
                         
                        <input className={styles.input} type="text" name="score1" onChange={handleChange}/>
                        <input className={styles.input} type="text" name="score2" onChange={handleChange}/>
                        <input className={styles.input} type="text" name="score3" onChange={handleChange}/>
                        <input className={styles.input} type="text" name="score4" onChange={handleChange}/>
                        <input className={styles.input} type="text" name="score5" onChange={handleChange}/>
                        
                        <button  className={styles.check} onClick={handleSubmit}>
                            <CheckIcon className={styles.checkMark}/>
                            Validate
                        </button>
                    </form>
                </div>
                
                <button  onClick={() => fetching_data(name, jwt, props.gameID,  props.roundID)}>refresh</button>
           </div>
        );
}

export default Round;
