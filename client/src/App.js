import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from './Context';
import withContext from './Context';

import Courses from "./components/Courses";
import Header from "./components/Header";
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignOut from './components/UserSignOut';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

const UserSignInWithContext = withContext(UserSignIn);
const CreateCourseWithContext = withContext(CreateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const CoursesWithContext = withContext(Courses)
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse)
const UserSignOutWithContext = withContext(UserSignOut)
const PrivateRouteWithContext = withContext(PrivateRoute)

function App() {
  return (
    <BrowserRouter>
    <Provider>
    <div className="App">
        <Header />
          <Routes>
            <Route path='/' element={<CoursesWithContext /> }/>
            <Route path='/courses/:id' element={<CourseDetailWithContext /> }/>
            <Route path='/signin' element={<UserSignInWithContext />} />
            <Route path='/signup' element={<UserSignUpWithContext />} />
            <Route path = '/courses/create' element={<PrivateRouteWithContext />}><Route path='' element={<CreateCourseWithContext />} /> </Route>
            <Route path = '/courses/:id/update' element={<PrivateRouteWithContext />}><Route path='' element={<UpdateCourseWithContext />} /> </Route>
            <Route path='/signout' element={<UserSignOutWithContext />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </div>
    </Provider>
    </BrowserRouter>
  );
}


export default App;
