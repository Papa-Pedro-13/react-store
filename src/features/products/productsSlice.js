import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { shuffle } from "../../utils/common";


export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, thunkAPI) => {
    try {
      const res = await axios(`${BASE_URL}/products`);
      return res.data
    }
    catch (err) {
      console.log(err)
      return thunkAPI.rejectWithValue;
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    filtered: [],
    related: [],
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter((item) => item.price < payload)
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.list.filter(({ category: { id } }) => id === payload)
      state.related = shuffle(list);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload;
    })
  }
})
export const { filterByPrice, getRelatedProducts } = productsSlice.actions
export default productsSlice.reducer;