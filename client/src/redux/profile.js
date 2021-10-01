import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: "",
    profileImage: "",
    rooms: []
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfileData: (state, action) => {
            const { username, profileImage, rooms } = action.payload;
            state.username = username
            state.profileImage = profileImage
            state.rooms = rooms
        }
    },
})

export const { setProfileData } = profileSlice.actions
export default profileSlice.reducer;