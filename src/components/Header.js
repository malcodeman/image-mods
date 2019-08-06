import React from "react"
import { Link } from "gatsby"

import styles from "./header.module.css"

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <span className={styles.text}>Tenet</span>
      </Link>
      <div className={styles.nav}>
        <Link to="/" className={styles.link}>
          About
        </Link>
        <Link to="/" className={styles.link}>
          Blog
        </Link>
        <Link to="/" className={styles.link}>
          Contact us
        </Link>
      </div>
    </header>
  )
}

export default Header
