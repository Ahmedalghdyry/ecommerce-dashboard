import {  createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { addItemShoppingCart } from "../../utils";
import type { IProductSlice } from "../../interface";
import { createStandaloneToast } from "@chakra-ui/react";


interface ICartItems extends IProductSlice {
  quantity: number;
}


interface ICartState {
  cartProducts: ICartItems[];
}

const initialState:ICartState = {
    cartProducts: [],
}

const { toast } = createStandaloneToast();


const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItems>) => {
            state.cartProducts=addItemShoppingCart(action.payload, state.cartProducts);
        },
         RemoveFromCart: (state, action: PayloadAction<number>) => {
            state.cartProducts=state.cartProducts.filter(item => item.id !== action.payload)
              toast({
          title: "Removed From Your cart ",
          status: "success",
          duration: 2000,
          isClosable: true,
          colorScheme:"red"
        });
        
        },
          clerCart: (state) => {
            state.cartProducts=[]
              toast({
          title: "Your is cart empty new",
          status: "success",
          duration: 2000,
          isClosable: true,
          colorScheme:"red"
        });
        }
        

}
})


export const { addToCart, RemoveFromCart,clerCart } = CartSlice.actions;

export const SliceCart = (state: RootState) => state.cart.cartProducts;

export default CartSlice.reducer;