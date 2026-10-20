import { createSlice } from '@reduxjs/toolkit'
import { getObjectFromStorage } from '../../../utils/storage.js'

// Auth ka initial state — logged in user localStorage se load ho jata hai
// taake page reload ke baad bhi user login hi rahe
const initialState = {
  user: getObjectFromStorage('loggedInUser'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login ke baad user ko store me set karte hain
    setUser: (state, action) => {
      state.user = action.payload
    },
    // Logout par user ko null kar dete hain
    clearUser: (state) => {
      state.user = null
    },
  },
})

// Ye action creators hain, inhe dispatch(addToCart(...)) jaise use karte hain
export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer
