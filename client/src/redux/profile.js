import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: "",
    userId: ""
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileData: (state, action) => {
            const { username, id } = action.payload;
            state.username = username
            state.userId = id
        }
    },
})

export const { setProfileData } = profileSlice.actions
export default profileSlice.reducer;