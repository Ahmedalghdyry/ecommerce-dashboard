import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import CartSlice from "./features/Cartslise";
import globalSlice from "./features/globalSlice";
import { persistStore, persistReducer } from 'redux-persist'
// import storage from "redux-persist/lib/storage"; 
import storage from "redux-persist/es/storage";
import { apiSlice } from "./services/apiSlice";
import netowrkSlice from "./features/netowrkSlice";
// ...
const persistConfig = {
  key: 'cart',
    storage,
}
 
const persistedConfig = persistReducer(persistConfig, CartSlice)
 
export const store = configureStore({
  reducer: {
    netowrk: netowrkSlice,
    cart: persistedConfig,
    login: loginSlice,
    global: globalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefmiddleware => getDefmiddleware({
    serializableCheck: false
  }).concat([apiSlice.middleware ])
});
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store)