import styles from './Game.module.scss'
import {useEffect, useState} from "react";
import apple from '../../img/apple.png'
import Interval from "./Interval";

export default function Game({FieldSize , FieldRow , isGame}){
    const [canClick , setCanClick] = useState(true)
    const [isPaused , setIsPaused] = useState(false)
    const [foodItem , setFoodItem] = useState({
        x: Math.floor(Math.random() * FieldSize),
        y: Math.floor(Math.random() * FieldSize)
    })
    const [snake , setSnake] = useState([
        {x:8,y:8},
        {x:8,y:7},
        {x:8,y:6}
    ])
    const direction = {
        Right:{x:0 , y: 1},
        Left:{x:0 , y: -1},
        Top:{x:-1 , y: 0},
        Down:{x:1 , y: 0},
    }
    const [directionState , setDirection] = useState(direction.Right)
    const [head , ...tail] = snake
    const snakeLose = tail.some(segment => segment.x === head.x && segment.y === head.y)
    function fieldLimit(coord){
        if(coord >= FieldSize){
            return 0
        }
        if(coord < 0){
            return FieldSize - 1
        }
        return coord
    }
    function newPosition(snake , direction){
        const newHead = {
            x: fieldLimit(head.x + direction.x),
            y: fieldLimit(head.y + direction.y)
        }

        if(snakeEat(newHead , foodItem)){

            setFoodItem({
                x: Math.floor(Math.random() * FieldSize),
                y: Math.floor(Math.random() * FieldSize)
            })
            return [newHead , ...snake]
        }
        if(snake.some(segment => segment.x === foodItem.x && segment.y === foodItem.y)){
            setFoodItem({
                x: Math.floor(Math.random() * FieldSize),
                y: Math.floor(Math.random() * FieldSize)
            })
        }
        return [newHead , ...snake.slice(0 , -1)]
    }
    function getItem(x,y,snake){
        if(foodItem.x === x && foodItem.y === y){
            return <img src={apple} alt="a" width={25} height={25}/>
        }
        for(const segment of snake){
            if(segment.x=== x && segment.y === y){
                    return <div className={styles.snake}></div>
            }
        }
    }
        function snakeEat(head , food) {
            return head.x === food.x && head.y === food.y
        }
        function ClickTimeout(){
        setCanClick(false);
        setTimeout(()=>{setCanClick(true)},120)
        }
        function PlayerMove(e){
            if((e.key === 'ArrowUp' || e.key === 'w')&& canClick && directionState.x !== 1 &&  directionState.y !== 0 ) {
                setDirection(direction.Top)
                ClickTimeout()
            }
            if((e.key === 'ArrowLeft' || e.key === 'a')&& canClick && directionState.x !== 0 && directionState.y !== 1 ) {
                setDirection(direction.Left)
                ClickTimeout()
            }
            if((e.key === 'ArrowDown' || e.key === 's')&& canClick && directionState.x !== -1 &&  directionState.y !== 0 ) {
                setDirection(direction.Down)
                ClickTimeout()
            }
            if((e.key === 'ArrowRight' || e.key === 'd')&& canClick && directionState.x !== 0 && directionState.y !== -1  ) {
                setDirection(direction.Right)
                ClickTimeout()
            }
            if(e.key === 'p')setIsPaused(!isPaused)

        }
        Interval(()=>{
            setSnake(snake => newPosition(snake, directionState))
        }, (!isGame || snakeLose || isPaused)? null : snake.length-3 >= 50 ? 50 : 100)
    return(
        <div className={styles.game} tabIndex={0} onKeyDown={PlayerMove}>
                {
                    FieldRow.map(y=> <div key={y}>{FieldRow.map(x=><div className={styles.cell} key={x}>{getItem(x,y,snake)|| ''}</div>)}</div>)
                }


        </div>
    )
}