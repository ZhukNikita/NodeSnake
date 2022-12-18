import styles from './App.module.scss'
import Game from "./components/Game/Game";
import {useEffect, useState} from "react";
import StartScreen from "./components/StartScreen/StartScreen";
import GuideBlock from "./components/GuideBlock/GuideBlock";
import TopHighScores from "./components/TopHighScore/TopHighScores";
import {useDispatch, useSelector} from "react-redux";
import {getPlayers} from "./redux/slices/Player";
import axios from "./axios";

function App() {
    const dispatch = useDispatch()
    const data = useSelector(state=> state.players.data)
    const [isGame , setIsGame] = useState(false)
    const [name , setName] = useState('')
    const FieldSize = 16
    const FieldRow = [...new Array(FieldSize).keys()]
    let arrForSort = data?.data.slice(0).sort((a,b)=> b.score - a.score)
    function toMenu(){
        setIsGame(false)
    }
    function inputName(e){
        setName(e.target.value)
    }
    async function TopScores(){
        const {data} = await axios.get('/api/player')
        return data
    }
    useEffect(()=>{
        dispatch(getPlayers())
    },[isGame])
    if(name === '') setName('Anonymous')
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
            {!isGame && <TopHighScores TopScores={TopScores} data ={arrForSort}/>}
        </div>

    </div>
  );
}

export default App;
