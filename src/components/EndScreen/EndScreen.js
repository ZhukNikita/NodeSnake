import styles from "./EndScreen.module.scss";

export default function EndScreen({setSnake, direction , setDirection ,toMenu , scores , setScores}) {
    function restart(){
        setSnake([
            {x: 8, y: 8},
            {x: 8, y: 7},
            {x: 8, y: 6}
        ])
        setDirection(direction.Right)
        setScores(0)
    }
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
                <h2>Scores: {scores}</h2>
            </div>

        </div>
    )
}