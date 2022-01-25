import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png';
import styles from './Header.module.css'

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {isOpen: false, in: false, up: false, name: "", password: "", confirm: ""};
        this.togglePopup = this.togglePopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

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
                        <input className={styles.input} type="text" value={this.state.url} name="name" onChange={this.handleChange}/>
                    </label>
                    <label className={styles.label}>
                        Password:
                        <input className={styles.input} type="text" value={this.state.url} name="password" onChange={this.handleChange}/>
                    </label>
                </form>

                <button className={styles.sign} type="button" onClick={this.handleSubmit}>Sign!</button>
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
                        <input className={styles.input} type="text" value={this.state.url} name="password" onChange={this.handleChange}/>
                    </label>
                    <label className={styles.label}>
                        Confirm Password:
                        <input className={styles.input} type="text" value={this.state.url} name="confirm" onChange={this.handleChange}/>
                    </label>
                </form>

                <button className={styles.sign} type="button" onClick={this.handleSubmit}>Sign!</button>
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
            <div className={styles.right}>
                <button className={styles.button} id={1} onClick={() => this.togglePopup("in")}>
                    <a className={styles.a}>Sign In</a>
                </button>
                <button className={styles.button} id={2} onClick={() => this.togglePopup("up")}>
                    <a className={styles.a}>Sign up</a>
                </button>
            </div>

            

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
