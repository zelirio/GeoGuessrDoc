import React, { useState, useEffect } from 'react';
import styles from "./PlayerLine.module.css"

const PlayerLine = (props) => {

    //const [playerName, setPlayerName] = useState("player")
    let score1 = props.scores[0][0]
    let score2 = props.scores[1][0]
    let score3 = props.scores[2][0]
    let score4 = props.scores[3][0]
    let score5 = props.scores[4][0]
   

    return (
    <div className={styles.tableau}>
        <p className={styles.name}>
            {props.playerName}
        </p>
        <p className={styles.score} >
            {score1}
        </p>
        <p className={styles.score}>
            {score2}
        </p>
        <p className={styles.score}>
            {score3}
        </p>
        <p className={styles.score}>
            {score4}
        </p>
        <p className={styles.score}>
            {score5}
        </p>
        <div className={styles.line}></div>
        <p className={styles.score}>
            {score1+score2+score3+score4+score5}
        </p>
    </div>);
};

export default PlayerLine
