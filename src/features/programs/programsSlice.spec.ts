import programsReducer, {
    getPrograms
} from './programsSlice';

import { ProgramsInterface } from './programsInterface'

describe('programs reducer', () => {
    const initialState = {
        programList: [] as ProgramsInterface[],
        status: 'idle',
    };

    it('should handle initial state', () => {
        expect(programsReducer(initialState, { type: 'unknown' })).toEqual({
            programList: [] as ProgramsInterface[],
            status: 'idle',
        });
    });

    it('should return status "loading" when fetching', () => {
        expect(programsReducer(initialState, { type: getPrograms.pending.type })).toEqual({
            programList: [] as ProgramsInterface[],
            status: 'loading',
        });
    });

    it('should return status "success" when fetch succeeds', () => {
        expect(programsReducer(initialState, { type: getPrograms.fulfilled.type, payload:[{id: 1}, {id:2}]})).toEqual({
            programList:[{id:1},{id:2}] as ProgramsInterface[],
            status: 'success',
        });
    });

    it('should return status "rejected" when fetch fails', () => {
        expect(programsReducer(initialState, { type: getPrograms.rejected.type })).toEqual({
            programList: [] as ProgramsInterface[],
            status: 'rejected',
        });
    });
});