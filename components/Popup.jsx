import React from 'react';
import {API_URL} from "../index.ts";


class Popup extends React.Component {


    constructor(props){
        super(props);
        this.state = {in: false, up: false, name: "", password: "", confirm: "", isLogin: false};
        this.togglePopup = this.togglePopup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
          });
        console.log(this.state)
    }

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
                        <input className={styles.input} type="text" value={this.state.url} name="name" onChange={this.handleChange}/>
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
                        <input className={styles.input} type="text" value={this.state.url} name="name" onChange={this.handleChange}/>
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
            this.state.isLogin = true
            this.togglePopup("")           
        }
    }



    render(props) {
        return (
            <div className={styles.popupBox}>
                <div className={styles.box}>
                <span className={styles.closeIcon} onClick={props.handleClose}>x</span>
                {props.content}
                </div>
            </div>
        );
    };
}