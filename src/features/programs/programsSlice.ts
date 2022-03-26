import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { ProgramInterface } from './programInterface'

export let getPrograms = createAsyncThunk('programs/getPrograms',async () => {
    let response = await fetch('https://raw.githubusercontent.com/Wargamers117/tv-coding-challenge/master/data.json')
    return (await response.json())
})

export let programsSlice = createSlice({
    name: 'programs',
    initialState: {
        programList: [] as ProgramInterface[],
        status: '',
    },
    extraReducers: (builder) => {
        builder.addCase(getPrograms.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(getPrograms.fulfilled, (state, { payload }) => {
            state.programList = payload
            state.status = 'success'
        })
        builder.addCase(getPrograms.rejected, (state, action) => {
            state.status = 'rejected'
        })
    },
    reducers: {}
})

export default programsSlice.reducer

export let selectProgramById = (state: RootState, programId: Number) => state.programs.programList.find((programList: { id: Number }) => programList.id === programId)