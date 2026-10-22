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
    // User delete karne ke liye
    deleteUser: (state, action) => {
      const { email, role } = action.payload
      state.items = state.items.filter(
        (item) => !(item.email === email && (!role || item.role === role))
      )
    },
  },
})

export const { addUser, deleteUser } = usersSlice.actions

export default usersSlice.reducer
