import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png';
import styles from './Header.module.css'
import {API_URL} from "../index.ts";
import {  LogoutIcon } from '@heroicons/react/outline'


class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {isOpen: false, in: false, up: false, name: "", password: "", confirm: "", isLogin: false};
        this.togglePopup = this.togglePopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.getName();

    }

    async test(username, password){

        let apiRes = await fetch(`${API_URL}/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        let data = await apiRes.json()
        console.log(data)
    }
    
    Popup(props) {
        return (
            <div className={styles.popupBox}>
                <div className={styles.box}>
                <span className={styles.closeIcon} onClick={props.handleClose}>x</span>
                {props.content}
                </div>
            </div>
        );
    };

    sign() {
        if(this.state.up){
            return this.signUp();
        }
        else{
            return this.signIn();
        }
    }

    signIn() {
        return (
            <div className={styles.popContent}>
                <h2>Sign in</h2>

                <form className={styles.form}>
                    <label className={styles.label}>
                        Name:
                        <input className={styles.input} type="text" value={this.state.url} name="name" maxLength={10} onChange={this.handleChange}/>
                    </label>
                    <label className={styles.label}>
                        Password:
                        <input className={styles.input} type="password" value={this.state.url} name="password" onChange={this.handleChange}/>
                    </label>
                </form>

                <button className={styles.sign} type="button" onClick={this.login}>Sign!</button>
            </div>
        );
    }

    signUp() {
        return (
            <div className={styles.popContent}>
                <h2>Sign up</h2>

                <form className={styles.form}>
                    <label className={styles.label}>
                        Name:
                        <input className={styles.input} type="text" value={this.state.url} name="name" maxLength={10} onChange={this.handleChange}/>
                    </label>
                    <label className={styles.label}>
                        Password:
                        <input className={styles.input} type="password" value={this.state.url} name="password" onChange={this.handleChange}/>
                    </label>
                    <label className={styles.label}>
                        Confirm Password:
                        <input className={styles.input} type="password" value={this.state.url} name="confirm" onChange={this.handleChange}/>
                    </label>
                </form>

                <button className={styles.sign} type="button" onClick={this.register}>Sign!</button>
            </div>
        );
    }

    togglePopup(event){
        if(event == ""){
            this.setState({isOpen: false, in: false, up: false, name: "", password: "", confirm: ""})
        }
        else{
            this.setState({
                isOpen: true,
                [event]: true
            })
        }
        console.log(this.state)
        console.log(API_URL)
        //this.test("lylian","qqqqq")
    }
    
    handleSubmit(evt){
        console.log(this.state)
        console.log("coucou")
    }

    async register(){

        let username = this.state.name;
        let password = this.state.password;
        let confirm = this.state.confirm;

        if(password != confirm){
            console.log("nope")
        }
        else{
            let apiRes = await fetch(`${API_URL}/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            })
            let data = await apiRes.json()
            console.log(data)
            this.togglePopup("")   
            if(data["message"] == "success"){
                sessionStorage.setItem("user",username)
                sessionStorage.setItem("token",data["token"])
            }
            this.getName();            
        }
    }
    
    async login() {

        let username = this.state.name;
        let password = this.state.password;

        console.log();

        let apiRes =  await fetch(`${API_URL}/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        let data =  await apiRes.json()  
        console.log(data)
        this.state.isLogin = true
        this.togglePopup("")
        if(data["message"] == "success"){
            sessionStorage.setItem("user",username)
            sessionStorage.setItem("token",data["token"])
        }
        this.getName();    
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
          });
        console.log(this.state)
    }

    disconnect(){
        this.setState({["username"]:null,["token"]:null})
        sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")
    }
    async getName(){
        let name = await sessionStorage.getItem("user");
        this.setState({["username"]:name})
        console.log(this.state)
    }
    render() {

    //let name = this.getName(); 
    
    return (
        <div>
        <div className={styles.line}>
            <div className={styles.left}> 
                <Link href="/">
                    <a>
                        <Image
                            src={logo}
                            alt="Picture of the author"
                            layout="intrinsic" // required
                            objectFit="contain" // change to suit your needs
                            width="125%"
                            height="125%" 
                        />    
                    </a>                
                </Link>
                <h2 className={styles.title}>GEO GUESSR DOC</h2>
            </div>
            {/*  Middle  */}
            <div className={styles.middle}>
                <Link href="/">
                    <a className={styles.a}>Home</a>
                </Link>
                <Link href="/game">
                    <a className={styles.a}>Game</a>
                </Link>
                <Link href="/Contact">
                    <a className={styles.a}>Contact Us</a>
                </Link>

            </div>
            
            {/* Right side*/}
            
            {this.state.username != null  && <div className={styles.user}>
                     Hello {this.state.username}
                    <button className={styles.logoutBut} data-hover = "Disconnect" onClick={() => this.disconnect()}>
                        <LogoutIcon className={styles.logout}  />
                    </button>
                
                        
                    
                      
                </div>}
            {this.state.username == null && <div className={styles.right}>
                    <button className={styles.button} id={1} onClick={() => this.togglePopup("in")}>
                        <a className={styles.a}>Sign In</a>
                    </button>
                    <button className={styles.button} id={2} onClick={() => this.togglePopup("up")}>
                        <a className={styles.a}>Sign up</a>
                    </button>
                </div>
            }

            

        </div>

        {this.state.isOpen && <this.Popup
                content={this.sign()}
                handleClose={() => this.togglePopup("")}
                />}

        </div>
        
        );
    }
}

export default Header;
