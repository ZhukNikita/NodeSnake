import {useEffect, useRef} from "react";


export default function Interval(callback , delay){
    const Callback = useRef()
    useEffect(()=>{
        Callback.current = callback
    },[callback])
    useEffect(() => {
        function tick(){
            Callback.current()
        }
        if(delay !== null){
            let id = setInterval(tick , delay)
            return ()=> clearInterval(id)
        }
    }, [delay]);

}