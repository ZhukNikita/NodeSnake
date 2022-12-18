import styles from './TopHighScores.module.scss'
import {useState} from "react";

export default function TopHighScores({data , TopScores}) {
    const [isOpen, setIsOpen] = useState(false)
    const arr = data?.slice(0,10)
    function onClick(){
        setIsOpen(!isOpen)
        TopScores()
    }
    return(
        <div className={styles.body}>
            <h3>Top 10 Players:</h3>
            <div className={styles.burger} style={isOpen? {height:'100%'}:{height:0}}>
                {data && isOpen? arr.map(el=>
                    <div  key={el.id} className={styles.topList}>
                        <div>{el.name}</div>
                        <div>{el.score}</div>
                    </div>
                    )

                    : ''}
            </div>

            {
               !isOpen &&
                   <div onClick={onClick} className={styles.open}>open</div>
            }
            {
                isOpen &&
                <div onClick={()=>setIsOpen(!isOpen)}  className={styles.close}>close</div>
            }

        </div>
    )
}