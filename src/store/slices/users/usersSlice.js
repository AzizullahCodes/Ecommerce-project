import { createSlice } from '@reduxjs/toolkit'
import { getArrayFromStorage } from '../../../utils/storage.js'

// Users ka initial state — localStorage se load hote hain
const initialState = {
  items: getArrayFromStorage('users'),
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Signup par naya user list me add karte hain
    addUser: (state, action) => {
      state.items.push(action.payload)
    },
  },
})

export const { addUser } = usersSlice.actions

export default usersSlice.reducer
