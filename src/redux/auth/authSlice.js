import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";

export const createAccountThunk = createAsyncThunk("auth/createAccount", async ({ email, password, name, photo }) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
    })
    return {
        id: userCredentials.user.uid,
        displayName: name,
        email: email,
        accessToken: userCredentials.user.accessToken,
        photoURL: photo
    }
});



const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAccountThunk.pending, (state) => {
            state.loading = true;
            state.error = null
        }).addCase(createAccountThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null
        }).addCase(createAccountThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

const authReducer = authSlice.reducer;
export default authReducer;