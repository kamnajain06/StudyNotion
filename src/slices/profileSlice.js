import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
            try {
                localStorage.setItem("user", JSON.stringify(value.payload));
            } catch (e) {
                console.error("Could not save user to localStorage:", e);
            }
        },
    },
    setLoading(state, value) {
        state.loading = value.payload;
    }
}
)

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;