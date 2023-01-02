import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedFile: null,
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setSelectedFile: (state, action)=>{
            state.selectedFile = action.payload
        }
    }
});

export const { setSelectedFile } = globalSlice.actions;
export default globalSlice.reducer;