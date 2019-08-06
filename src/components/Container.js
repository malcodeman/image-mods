import React from "react"

import styles from "./container.module.css"

function Container(props) {
  const { children } = props

  return <div className={styles.container}>{children}</div>
}

export default Container
