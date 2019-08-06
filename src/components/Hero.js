import React from "react"
import { Link } from "gatsby"

import styles from "./hero.module.css"
import hero from "../images/hero.jpg"

function Hero() {
  return (
    <div className={styles.hero}>
      <div>
        <h1 className={styles.title}>TENET Foundation</h1>
        <p className={styles.text}>
          A non-profit born at the intersection of blockchain and collective
          intelligence .
        </p>
        <p className={styles.text}>
          We nurture projects helping individuals unlock their potential through
          open systems that expand our collective minds at local, regional and
          global scales.
        </p>
        <Link to="/" className={styles.link}>
          Lear more
        </Link>
      </div>
      <img src={hero} alt="" className={styles.image} />
    </div>
  )
}

export default Hero
