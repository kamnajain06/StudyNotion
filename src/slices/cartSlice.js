import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast'


const initialState = {
    cart: localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
    total: localStorage.getItem("total")
        ? JSON.parse(localStorage.getItem("total"))
        : 0,
    totalItems: localStorage.getItem("totalItems")
        ? JSON.parse(localStorage.getItem("totalItems"))
        : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItems(state, action) {
            // console.log("State", state);
            // console.log("Action", action);

            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);
            if (index >= 0) {
                toast.error("Course already in cart")
                return
            } else {
                state.cart.push(course);
            }
            state.total += parseInt(course.price);
            state.totalItems += 1;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            toast.success("Course added to cart successfully");
        },
        removeItems(state, action) {
            console.log("State", state);
            console.log("Action", action);

            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);
            if (index >= 0) {
                state.total -= parseInt(state.cart[index].price);
                state.totalItems -= 1;
                state.cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                toast.success("Course removed from cart successfully");
            } else {
                toast.error("Course not found in cart");
            }
        },
        resetCart(state, action) {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.success("Cart reset successfully");
        }

    }
})

export const { addItems, removeItems, resetCart } = cartSlice.actions;
export default cartSlice.reducer;