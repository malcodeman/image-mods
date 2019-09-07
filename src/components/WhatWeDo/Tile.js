import React from "react"
import { Link } from "gatsby"

import styles from "./tileStyles.module.css"

function Tile(props) {
  const { title, description, link } = props

  return (
    <div className={styles.tile}>
      <h3 className={styles.tileTitle}>{title}</h3>
      <p className={styles.tileDescription}>{description}</p>
      <Link to={link} className={styles.tileLink}>
        Learn more
      </Link>
    </div>
  )
}

export default Tile
