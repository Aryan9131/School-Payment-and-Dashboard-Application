// Import the required Firestore functions
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: "",
    userDetails: null,
    isLightMode: true,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Fetch User Profile
export const fetchUser = createAsyncThunk("user/fetchUser", async (userId, token) => {
    const userProfile = await fetch(`https://school-payment-and-dashboard-application.onrender.com/api/user/fetch-user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Header keys should be quoted, not the object itself
            'Authorization': `Bearer ${token}`
        },
    });
    return userProfile;
});

// Async thunk for fetching all users
// export const getAllServices = createAsyncThunk(`admin/getAllServices`, async () => {
//     const services = await fetchAllServices(); // Fetch all users from Firestore
//     return services;
// });


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userDetails = action.payload;
        },
        clearUser: (state) => {
            state.userDetails = null;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        toggleMode:(state, action)=>{
            state.isLightMode= !state.isLightMode
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userDetails = action.payload; // Store user profile
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    },
});

export const { clearUser, setUser, setSearchQuery ,toggleMode} = userSlice.actions;
export default userSlice.reducer;