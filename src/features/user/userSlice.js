import { createSlice } from "@reduxjs/toolkit"

import { BASE_URL } from "../../utils/constants";



const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: [],
    cart: [],
    isLoading: false
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart]
      const find = state.cart.find(({ id }) => id === payload.id)

      if (find) {
        newCart = newCart.map((item) => item.id === payload.id ? { ...item, quantity: payload.quantity || item.quantity + 1 } : item)
      } else {
        newCart.push({ ...payload, quantity: 1 })
      }
      state.cart = newCart
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(getUser.fulfilled, (state, action) => {
    //   state.list = action.payload;
    // })
  }
})
export const { addItemToCart } = userSlice.actions;

export default userSlice.reducer;