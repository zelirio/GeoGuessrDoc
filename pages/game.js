import Head from "next/head";
import React, {Component,useState} from "react";
import Header from "../components/Header";
import H from "../components/H";
import styles from "../styles/game.module.css";


class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {gameName:"", nbrPlayers:"", nbrRounds:"", url:""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(evt){
        console.log(this.state)
        console.log("coucou")
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
          });
        console.log(this.state)
    }

    render() {
      return (
      <div className = "">
        <H/>
            
        <Header />

        <div className="">
            <div className = {styles.block}>
                <div className = "">
                    <div className={styles.title}>Create new game</div>
                    <form className={styles.form}>
                        <label className={styles.label}>
                            Game Name:
                            <input className={styles.input} type="text" value={this.state.gameName} name="gameName" onChange={this.handleChange}/>
                        </label>
                        <label className={styles.label}>
                            Number of players:
                            <input className={styles.input} type="text" value={this.state.nbrPlayers} name="nbrPlayers" onChange={this.handleChange}/>
                        </label>
                        <label className={styles.label}>
                            Number of rounds:
                            <input className={styles.input} type="text" value={this.state.nbrRounds} name="nbrRounds" onChange={this.handleChange}/>
                        </label>
                    </form>
                    <button type="button" onClick={this.handleSubmit}>Guess!</button>
                </div>

                <div className="">
                    <div className={styles.title}>Join Game</div>
                    <form onSubmit={this.handleSubmit}>
                        <label className={styles.label}>
                            URL:
                            <input className={styles.input} type="text" value={this.state.url} name="url" onChange={this.handleChange}/>
                        </label>
                    </form>
                    <button type="button" onClick={this.handleSubmit}>Join!</button>
                </div>
                
            </div>

           

        </div>
      </div>
      );
    }
  }

export default Game;