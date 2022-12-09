import styles from './StartScreen.module.scss'
import snake from '../../img/snake.png'
import border from '../../img/border.png'
export default function StartScreen({setIsGame}) {
    return(
        <div className={styles.body}>
            <div className={styles.logo}>
                <img src={snake} alt="a"/>
            </div>
            <div className={styles.centerBlock}>
                <h1>Snake</h1>
                <div className={styles.nameInput} style={{ backgroundImage: `url(${border})`  , backgroundSize:'300px 50px' , backgroundRepeat:'no-repeat' }}>
                    <input type="text" placeholder='shhhh your name'/>
                </div>

                <button className={styles.start} onClick={()=>setIsGame(true)}>Start!</button>
            </div>
            <div></div>
        </div>
    )
}