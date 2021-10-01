import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './profile';

export default configureStore({
    reducer: {
        userProfile: profileReducer
    },
})