import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { scrapeInstagramProfile } from "../../services/apifyService";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { database } from "../../Firebase/firebaseConfig";

const collectionName = 'restaurants';
const collectionRef = collection(database, collectionName)

export const fetchRestaurantProfile = createAsyncThunk(
  'restaurants/fetchProfile',
  async (username, { rejectWithValue }) => {
    try {
      const profileData = await scrapeInstagramProfile(username);
      await addDoc(collectionRef, profileData);
      return profileData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchStoredRestaurants = createAsyncThunk(
  "restaurants/fetchStored",
  async () => {
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurantProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRestaurantProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.push(action.payload);
      })
      .addCase(fetchRestaurantProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchStoredRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      });
  },
});

export default restaurantsSlice.reducer;