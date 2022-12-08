import styles from './App.module.scss'
import Game from "./components/Game/Game";
import {useState} from "react";
import StartScreen from "./components/StartScreen/StartScreen";

function App() {
    const [isGame , setIsGame] = useState(false)
    const [isLose , setIsLose] = useState(false)
    const FieldSize = 16
    const FieldRow = [...new Array(FieldSize).keys()]


  return (
    <div className={styles.App} >
        <div className={styles.inputName}>
        </div>
        <div className={styles.gameBody}>
            {
                !isGame && <StartScreen setIsGame={setIsGame}/>
            }
            {
                isGame && <Game FieldSize = {FieldSize} FieldRow = {FieldRow} isGame={isGame}/>
            }
            {
                isLose &&
            }
        </div>
    </div>
  );
}

export default App;
