import styles from './GuideBlock.module.scss'
export default function GuideBlock(){
    return(
        <div className={styles.body}>
            <div className={styles.points}>
                <div>
                    <h4>w/a/s/d or</h4>
                    <h4>(Up/Down/Right/Left)</h4>
                </div>
                <div>-</div>
                <h4>Move</h4>
            </div>
            <div className={styles.points}>
                    <h4>p or Space</h4>
                    <div>-</div>
                    <h4>Pause</h4>
            </div>
        </div>
    )
}