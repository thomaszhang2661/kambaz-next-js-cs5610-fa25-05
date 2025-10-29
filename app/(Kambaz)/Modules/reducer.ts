import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modules } from "../Database";

type Lesson = { _id?: string; name?: string };
type Module = { _id?: string; course?: string; name?: string; lessons?: Lesson[] };

const initialState: { modules: Module[] } = {
  modules: (modules || []) as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addNewModule: (state, action: PayloadAction<Module>) => {
      const m = action.payload;
      const newModule: Module = { ...m, _id: new Date().getTime().toString() };
      state.modules = [...state.modules, newModule];
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.modules = state.modules.filter((m) => m._id !== id);
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      const m = action.payload;
      state.modules = state.modules.map((x) => (x._id === m._id ? m : x));
    },
  },
});

export const { addNewModule, deleteModule, updateModule } = modulesSlice.actions;
export default modulesSlice.reducer;
