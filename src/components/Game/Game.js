import styles from './Game.module.scss'
import {useEffect, useRef, useState} from "react";
import apple1 from '../../img/apple1score.png'
import apple5 from '../../img/apple5score.png'
import apple10 from '../../img/apple10scores.png'
import Interval from "./Interval";
import EndScreen from "../EndScreen/EndScreen";
import PauseScreen from "../PauseScreen/PauseScreen";

export default function Game({FieldSize, FieldRow, isGame , toMenu , name}) {
    const divFocus = useRef(null)
    const [canClick, setCanClick] = useState(true)
    const [isPaused, setIsPaused] = useState(false)
    const [score, setScores] = useState(0)
    const [foodItem, setFoodItem] = useState({
        type: (Math.floor(Math.random() * (3 - 1 + 1)) + 1),
        x: Math.floor(Math.random() * FieldSize),
        y: Math.floor(Math.random() * FieldSize)
    })

    const [snake, setSnake] = useState(
        [
            {x: 8, y: 8},
            {x: 8, y: 7},
            {x: 8, y: 6}
        ]
    )
    useEffect(()=>{
        divFocus.current.focus()
    },[ null , snake])

    const direction = {
        Right: {x: 0, y: 1},
        Left: {x: 0, y: -1},
        Top: {x: -1, y: 0},
        Down: {x: 1, y: 0},
    }
    const [directionState, setDirection] = useState(direction.Right)
    const [head, ...tail] = snake
    const snakeLose  = tail.some(segment => segment.x === head.x && segment.y === head.y)
    function fieldLimit(coord) {
        if (coord >= FieldSize) {
            return 0
        }
        if (coord < 0) {
            return FieldSize - 1
        }
        return coord
    }

    function newPosition(snake, direction) {
        const newHead = {
            x: fieldLimit(head.x + direction.x),
            y: fieldLimit(head.y + direction.y)
        }

        if (snakeEat(newHead, foodItem)) {
            if (foodItem.type === 3)setScores(score + 10)
            else
            if (foodItem.type === 2)setScores(score + 5)
            else setScores(score + 1)

            setFoodItem({
                type: (Math.floor(Math.random() * (3 - 1 + 1)) + 1),
                x: Math.floor(Math.random() * FieldSize),
                y: Math.floor(Math.random() * FieldSize)
            })
            return [newHead, ...snake]
        }
        if (snake.some(segment => segment.x === foodItem.x && segment.y === foodItem.y)) {
            setFoodItem({
                type: (Math.floor(Math.random() * (3 - 1 + 1)) + 1),
                x: Math.floor(Math.random() * FieldSize),
                y: Math.floor(Math.random() * FieldSize)
            })
        }
        return [newHead, ...snake.slice(0, -1)]
    }

    function getItem(x, y, snake) {
        if (foodItem.x === x && foodItem.y === y) {
            if(foodItem.type === 3) return <img src={apple10} alt="a" width={25} height={25}/>
            if(foodItem.type === 2)return <img src={apple5} alt="a" width={25} height={25}/>
            if(foodItem.type === 1) return <img src={apple1} alt="a" width={25} height={25}/>
        }
        for (const segment of snake) {
            if (segment.x === x && segment.y === y) {
                return <div className={styles.snake}></div>
            }
        }
    }

    function snakeEat(head, food) {
        return head.x === food.x && head.y === food.y
    }

    function ClickTimeout() {
        setCanClick(false);
        setTimeout(() => {
            setCanClick(true)
        }, 100)
    }

    function PlayerMove(e) {
        if ((e.key === 'ArrowUp' || e.key === 'w') && canClick && directionState.x !== 1 && directionState.y !== 0) {
            setDirection(direction.Top)
            ClickTimeout()
        }
        if ((e.key === 'ArrowLeft' || e.key === 'a') && canClick && directionState.x !== 0 && directionState.y !== 1) {
            setDirection(direction.Left)
            ClickTimeout()
        }
        if ((e.key === 'ArrowDown' || e.key === 's') && canClick && directionState.x !== -1 && directionState.y !== 0) {
            setDirection(direction.Down)
            ClickTimeout()
        }
        if ((e.key === 'ArrowRight' || e.key === 'd') && canClick && directionState.x !== 0 && directionState.y !== -1) {
            setDirection(direction.Right)
            ClickTimeout()
        }
        if (e.key === 'p' || e.key === ' ') setIsPaused(!isPaused)
    }
    function speed(){
        if(score >= 50 && score < 100){
            return 100
        }else{
        if(score >= 100 && score< 150){
            return 80
        }else{
            if(score>= 150){
                return 60
            }
        }}
        return 120
    }
    Interval(() => {
        setSnake(snake => newPosition(snake, directionState))
    }, (!isGame || snakeLose || isPaused) ? null : speed())

    return (
        <div className={styles.game} tabIndex={0} onKeyDown={PlayerMove} ref={divFocus}>
            {!snakeLose &&
                FieldRow.map(y => <div key={y}>{FieldRow.map(x => <div className={styles.cell}
                                                                       key={x}>{getItem(x, y, snake) || ''}</div>)}</div>)
            }
            {
                isPaused &&
                <div className={styles.pause}>
                    <PauseScreen/>
                </div>
            }
            {
                snakeLose && <EndScreen
                    name={name}
                    setScores={setScores}
                    score={score}
                    toMenu={toMenu}
                    setDirection={setDirection}
                    direction={direction}
                    setSnake={setSnake}
                />
            }
            {  !snakeLose &&
                (<div className={styles.scores}>
                    <h4>Scores:</h4>
                    <h4>{score}</h4>
                </div>)
            }

        </div>
    )
}