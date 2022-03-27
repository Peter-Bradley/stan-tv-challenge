import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { ProgramsInterface } from './programsInterface'

export let getPrograms = createAsyncThunk('programs/getPrograms',async () => {
    let response = await fetch('https://raw.githubusercontent.com/StreamCo/tv-coding-challenge/master/data.json')
    return (await response.json())
})

export let programsSlice = createSlice({
    name: 'programs',
    initialState: {
        programList: [] as ProgramsInterface[],
        status: 'idle',
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