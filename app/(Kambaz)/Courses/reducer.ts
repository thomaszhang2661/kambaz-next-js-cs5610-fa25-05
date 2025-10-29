import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses } from "../Database";

type Course = {
  _id?: string;
  name?: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  description?: string;
};

const initialState: { courses: Course[] } = {
  courses: (courses || []) as Course[],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addNewCourse: (state, action: PayloadAction<Course>) => {
      const course = action.payload;
      const newCourse: Course = {
        ...course,
        _id: new Date().getTime().toString(),
      };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      state.courses = state.courses.filter((c) => c._id !== courseId);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const course = action.payload;
      state.courses = state.courses.map((c) =>
        c._id === course._id ? course : c
      );
    },
  },
});

export const { addNewCourse, deleteCourse, updateCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
