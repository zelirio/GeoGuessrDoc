import H from "../components/H.jsx"
import Header from "../components/Header.jsx"
import homePage from "../public/homePage.jpg"
import Image from "next/image"
import styles from "../styles/homePage.module.css";

export default function Home() {
  return ( 
    <div className={styles.bg}>
      <H/>
      <Header/>
      <button className={styles.button} type="button">Guess!</button>
      
      <p className={styles.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  )
}
