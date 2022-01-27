import Head from "next/head";
import React, {Component,useState} from "react";
import Header from "../components/Header";
import H from "../components/H";
import styles from "../styles/game.module.css";
import logo from '../public/logo.png';
import gameImage from '../public/gamePage.jpg';
import Image from 'next/image';
import Router from "next/router";
import { useRouter } from 'next/router'
import {API_URL} from "../index.ts";

class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {gameName:"", nbrPlayers:"", nbrRounds:"", url:""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



    async handleSubmit(){
        await this.getName()
        await this.getJwt()
        console.log(this.state)
        let gameName = this.state.gameName;
        let nbrPlayers = this.state.nbrPlayers;
        let nbrRounds = this.state.nbrRounds;
        let name = await this.state.username;
        let jwt = await this.state.jwt;

        let apiRes = await fetch(`${API_URL}/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "gameName": gameName,
                "nbrPlayers": nbrPlayers,
                "nbrRounds": nbrRounds,
                "username" : name,
                "jwt": jwt
            })
        })
        let data = await apiRes.json()
        console.log(data)
        if(data.message == "success"){
            const router = useRouter()
            const url = "/lobby/" + data["url"]
            router.push(url)
        }
        else{
            console.log("va te faire mettre")
        }
    }
    
    async getJwt(){
        let jwt = await sessionStorage.getItem("token");
        this.setState({["jwt"]:jwt})
        console.log(this.state)
    }
    async getName(){
        let name = await sessionStorage.getItem("user");
        this.setState({["username"]:name})
        console.log(this.state)
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
        <div className={styles.cols}>
            <div className = {styles.block}>
                <div className = "">
                    <div className={styles.title}>Create new game</div>
                    <form className={styles.form}>
                        <label className={styles.label}>
                            Game Name:
                            <input className={styles.input} type="text" value={this.state.gameName} name="gameName" onChange={e => this.handleChange(e)}/>
                        </label>
                        <label className={styles.label}>
                            Number of players:
                            <input className={styles.input} type="number" value={this.state.nbrPlayers} min={1} max={9} maxLength={1} name="nbrPlayers" onChange={this.handleChange}/>
                        </label>
                        <label className={styles.label}>
                            Number of rounds:
                            <input className={styles.input} type="number" value={this.state.nbrRounds} min={1} max={5} name="nbrRounds" onChange={this.handleChange}/>
                        </label>
                    </form>
                    <button className={styles.button} type="button" onClick={this.handleSubmit}>Guess!</button>
                </div>

                <div className="">
                    <div className={styles.title}>Join Game</div>
                    <form onSubmit={this.handleSubmit}>
                        <label className={styles.label}>
                            URL:
                            <input className={styles.input} type="text" value={this.state.url} name="url" onChange={this.handleChange}/>
                        </label>
                    </form>
                    <button className={styles.button} type="button" onClick={this.handleSubmit}>Join!</button>
                </div>
                
            </div>

            <div className={styles.right}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <a>
                    <Image
                        src={gameImage}
                        className={styles.img}
                        alt="Picture of the author"
                        layout="intrinsic" // required
                        objectFit="contain" // change to suit your needs
                        width="5000%"
                        height="5000%"
                    />
                </a>
            </div>
        </div>
      </div>
      );
    }
  }

export default Game;