import styles from './App.module.scss'
import Game from "./components/Game/Game";
import {useState} from "react";
import StartScreen from "./components/StartScreen/StartScreen";
import EndScreen from "./components/EndScreen/EndScreen";
import GuideBlock from "./components/GuideBlock/GuideBlock";

function App() {
    const [isGame , setIsGame] = useState(false)
    const FieldSize = 16
    const FieldRow = [...new Array(FieldSize).keys()]
    function toMenu(){
        setIsGame(false)
    }

  return (
    <div className={styles.App} >
        <div>
            {isGame && <GuideBlock/>}
        </div>
        <div className={styles.gameBody}>
            {
                !isGame && <StartScreen setIsGame={setIsGame}/>
            }
            {
                isGame && <Game toMenu={toMenu} FieldSize = {FieldSize} FieldRow = {FieldRow} isGame={isGame}/>
            }
        </div>
    </div>
  );
}

export default App;
