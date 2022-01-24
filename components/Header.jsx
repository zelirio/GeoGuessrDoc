import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/logo.png';
import styles from './Header.module.css'

function Header() {
  return (
    
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
            <Link href="/signin">
                <a className={styles.a}>Sign In</a>
            </Link>
            <Link href="/signup">
                <a className={styles.a}>Sign up</a>
            </Link>
        </div>
    </div>
    
    );
}

export default Header;
