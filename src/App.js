import React from 'react'; 
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import About from './Pages/About';
import Navbar from './Components/common/Navbar';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import UpdatePassword from './Pages/UpdatePassword';
import OpenRoute from './Components/Core/Auth/OpenRoute';
import VerifyEmail from './Pages/VerifyEmail';
import ContactUs from './Pages/ContactUs';
import Dashboard from './Pages/Dashboard';
import MyProfile from './Components/Core/Dashboard/MyProfile';
import PrivateRoute from './Components/Core/Auth/PrivateRoute';
import Error from './Pages/Error';
import EnrolledCourses from './Components/Core/Dashboard/EnrolledCourses';
import Settings from './Components/Core/Dashboard/Settings';
import Cart from './Components/Core/Dashboard/Cart';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import CreateCourse from './Components/Core/Dashboard/CreateCourse';
import MyCourses from './Components/Core/Dashboard/MyCourses';
import EditCourse from './Components/Core/Dashboard/InstructorCourses/EditCourse';
import Category from './Pages/Category';
import CourseDetails from './Pages/CourseDetails';
import ViewCourse from './Pages/ViewCourse';
import VideoDetails from './Components/Core/ViewCourse/VideoDetails';
import Instructor from './Components/Core/Dashboard/InstructorDashboard/Instructor';



const studentRoutes = [
  <Route key="enrolled-courses" path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />,
  <Route key="cart" path="/dashboard/cart" element={<Cart />} />
];
const instructorRoutes = [
  <Route path="/dashboard/instructor" element={<Instructor></Instructor>}></Route>,
  <Route key="my-courses" path="/dashboard/my-courses" element={<MyCourses />} />,
  <Route key="add-course" path="/dashboard/add-course" element={<CreateCourse />} />
];
function App() {
  const { user } = useSelector((state)=> state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 ">
      <Navbar className=''></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/category/:categoryName" element={<Category></Category>} />
        <Route path="/course/:courseId" element={<CourseDetails></CourseDetails>} />
        <Route path="/About" element={<About></About>} />
        <Route path="/contact" element={<ContactUs></ContactUs>} />
        <Route path="login" element={<OpenRoute><Login></Login></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup></Signup></OpenRoute>} />
        <Route path="forgot-password" element={<OpenRoute><ForgotPassword></ForgotPassword></OpenRoute>} />
        <Route path="reset-password/:id" element={<OpenRoute><UpdatePassword></UpdatePassword></OpenRoute>} />
        <Route path="verify-email" element={<OpenRoute><VerifyEmail></VerifyEmail></OpenRoute>} />
        <Route element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}>
          <Route path="/dashboard/my-profile" element={<MyProfile></MyProfile>}></Route>,
          <Route path="/dashboard/settings" element={<Settings></Settings>}></Route>
          <Route path = "/dashboard/add-course" element={<CreateCourse></CreateCourse>}></Route>
          <Route path = "/dashboard/my-courses/courses/edit-course/:courseId" element={<EditCourse></EditCourse>}></Route>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && studentRoutes}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && instructorRoutes}
        </Route>
        <Route element={<PrivateRoute><ViewCourse></ViewCourse></PrivateRoute>}>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && 
            <Route path="/view-course/:courseId/section/:sectionId/subSection/:subSectionId" 
            element={<VideoDetails></VideoDetails>}> </Route>
          }
        </Route>
        <Route path='*' element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}

export default App;
