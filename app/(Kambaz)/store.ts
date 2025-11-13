import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./Courses/reducer";
import modulesReducer from "./Modules/reducer";
import accountReducer from "./Account/reducer";

const store = configureStore({
  reducer: { coursesReducer, modulesReducer, accountReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
