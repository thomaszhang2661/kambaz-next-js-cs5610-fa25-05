import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Lesson = { _id?: string; name?: string };
type Module = {
  _id?: string;
  course?: string;
  name?: string;
  lessons?: Lesson[];
};

const initialState: { modules: Module[] } = {
  modules: [] as Module[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addNewModule: (state, action: PayloadAction<Module>) => {
      const m = action.payload;
      const newModule: Module = { ...m };
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
    setModules: (state, action: PayloadAction<Module[]>) => {
      state.modules = action.payload;
    },
  },
});

export const { addNewModule, deleteModule, updateModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;
