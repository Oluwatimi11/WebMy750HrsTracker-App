import React from 'react'
import styles from "./input-card.module.scss"

const InputCard = ({iconColor, ...otherProps}) => {
  return (
    <div className={styles["input__card"]} {...otherProps} />
  )
}

export default InputCard