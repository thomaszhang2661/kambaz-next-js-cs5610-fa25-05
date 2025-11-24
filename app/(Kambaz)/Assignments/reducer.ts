import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments } from "../Database";

type Assignment = {
  _id?: string;
  title?: string;
  course?: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
};

const initialState: { assignments: Assignment[] } = {
  assignments: (assignments || []) as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addNewAssignment: (state, action: PayloadAction<Assignment>) => {
      const a = action.payload;
      const newAssignment: Assignment = {
        ...a,
        _id: new Date().getTime().toString(),
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.assignments = state.assignments.filter((a) => a._id !== id);
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      const a = action.payload;
      state.assignments = state.assignments.map((x) =>
        x._id === a._id ? a : x
      );
    },
  },
});

export const { addNewAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
