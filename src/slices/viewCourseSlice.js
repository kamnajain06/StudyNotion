import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
}

const ViewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload;
        },
        setCourseEntireData: (state, action) => {
            state.courseEntireData = action.payload;
        },
        setCompletedLectures: (state, action) => {
            state.completedLectures = action.payload;
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload;
        },
        updateCompletedLectures: (state, action) => {
            state.completedLectures = action.payload;
        }
    }
})
export const { setCourseSectionData, setCourseEntireData, setCompletedLectures,
    setTotalNoOfLectures, updateCompletedLectures } = ViewCourseSlice.actions
export default ViewCourseSlice.reducer;