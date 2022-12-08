import styles from './StartScreen.module.scss'
export default function StartScreen({setIsGame}) {
    return(
        <div className={styles.body}>
            <div>

            </div>
            <div>
                <h1>Snake</h1>
                <button className={styles.start} onClick={()=>setIsGame(true)}>Start!</button>
            </div>
            <h2>High Score:</h2>
        </div>
    )
}