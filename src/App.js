import styles from './App.module.scss'
import Game from "./components/Game/Game";
import {useEffect, useState} from "react";
import StartScreen from "./components/StartScreen/StartScreen";
import GuideBlock from "./components/GuideBlock/GuideBlock";
import TopHighScores from "./components/TopHighScore/TopHighScores";
import {useDispatch, useSelector} from "react-redux";
import {getPlayers} from "./redux/slices/Player";

function App() {
    const dispatch = useDispatch()
    const data = useSelector(state=> state.players.data)
    const [isGame , setIsGame] = useState(false)
    const [name , setName] = useState('')
    const FieldSize = 16
    const FieldRow = [...new Array(FieldSize).keys()]
    let arrForSort = data?.data.slice(0,10)
    function toMenu(){
        setIsGame(false)
    }
    function inputName(e){
        setName(e.target.value)
    }
    useEffect(()=>{
        dispatch(getPlayers())
    },[isGame])
    if(name === '') setName('NoName')
    return (
    <div className={styles.App} >
        <div>
            {isGame && <GuideBlock/>}
        </div>
        <div className={styles.body}>
            <div className={styles.gameBody}>
                {
                    !isGame && <StartScreen setIsGame={setIsGame} inputName={inputName}/>
                }
                {
                    isGame && <Game name={name} toMenu={toMenu} FieldSize = {FieldSize} FieldRow = {FieldRow} isGame={isGame}/>
                }
            </div>
            {!isGame && <TopHighScores data ={arrForSort}/>}
        </div>

    </div>
  );
}

export default App;
