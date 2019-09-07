import React from "react"

import Tile from "./Tile"

import { TILES } from "./constants"

import styles from "./whatWeDoStyles.module.css"

function WhatWeDo() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>What we do</h1>
      <div className={styles.grid}>
        {TILES.map(element => (
          <Tile
            title={element.title}
            description={element.description}
            link={element.link}
          />
        ))}
      </div>
    </div>
  )
}

export default WhatWeDo
