import {configureStore} from '@reduxjs/toolkit'
import {playersReducers} from "./slices/Player";

const store = configureStore({
    reducer:{
        players: playersReducers,
    }

})
export default store