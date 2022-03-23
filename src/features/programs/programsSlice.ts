import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getPrograms = createAsyncThunk('programs/getPrograms',async () => {
    const response = await fetch('https://raw.githubusercontent.com/Wargamers117/tv-coding-challenge/master/data.json')
    return (await response.json())
})

export const programsSlice = createSlice({
    name: 'programs',
    initialState: {
        programList: {},
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