import styles from "./EndScreen.module.scss";
import {useEffect} from "react";
import axios from "../../axios";

export default function EndScreen({setSnake, direction , setDirection ,toMenu , score , name , setScores  }) {

    function restart(){
        setSnake([
            {x: 8, y: 8},
            {x: 8, y: 7},
            {x: 8, y: 6}
        ])
        setDirection(direction.Right)
        setScores(0)
    }
    const fields = {name  , score}
    useEffect(  ()=>{
       const {data} =  axios.post('/api/player' , fields)
        return data
    },[])
    return(
        <div className={styles.body}>
            <div>

            </div>
            <div>
                <h1>Lose</h1>
                <button onClick={restart} className={styles.restart}>Restart</button>
            </div>
            <div>
                <button className={styles.menu} onClick={toMenu}>Menu</button>
                <h2>Scores: {score}</h2>
            </div>

        </div>
    )
}