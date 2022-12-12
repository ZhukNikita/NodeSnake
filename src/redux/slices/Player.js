import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios'

export const createPlayers =  createAsyncThunk('players/fetchPlayers' , async(name , score)=>{
    const { data } = await axios.post(`/api/player` , name , score)
    return {data};
})
export const getPlayers =  createAsyncThunk('players/fetchPlayers' , async()=>{
    const { data } = await axios.get(`/api/player`)
    return {data};
})

const initialState = {
    players:{
        items : [],
        status: 'loading'
    }
};

const PlayersSlice = createSlice({
    name:'players',
    initialState,
    reducers : {},
    extraReducers: {
        [getPlayers.pending]: (state) => {
            state.players.items = []
            state.players.status = 'loading'
        },
        [getPlayers.fulfilled]: (state, action) => {
            state.players.items = action.payload;
            state.players.status = 'loaded'
        },
        [getPlayers.rejected]: (state) => {
            state.players.items = []
            state.players.status = 'error'
        },
        [createPlayers.pending]: (state)=>{
            state.data = null
            state.status = 'loading'
        },
        [createPlayers.fulfilled]: (state , action)=>{
            state.data = action.payload
            state.status = 'loaded'
        },
        [createPlayers.rejected]: (state)=>{
            state.data = null
            state.status = 'error'
        }
    }
})
export const playersReducers = PlayersSlice.reducer
