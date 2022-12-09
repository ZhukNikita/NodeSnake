import styles from './TopHighScores.module.scss'
import {useState} from "react";

export default function TopHighScores() {
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div className={styles.body}>
            <h3>Top 10 High Score:</h3>
            <div className={styles.burger} style={isOpen? {height:'200px'}:{height:0}}>

            </div>

            {
               !isOpen &&
                   <div onClick={()=>setIsOpen(!isOpen)} className={styles.open}>open</div>
            }
            {
                isOpen &&
                <div onClick={()=>setIsOpen(!isOpen)}  className={styles.close}>close</div>
            }

        </div>
    )
}