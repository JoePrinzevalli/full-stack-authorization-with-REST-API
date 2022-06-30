import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from './Context';
import withContext from './Context';

import Courses from "./components/Courses";
import Header from "./components/Header";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDeatil';
import SignOut from './components/SignOut';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';

const SignInWithContext = withContext(SignIn);
const CreateCourseWithContext = withContext(CreateCourse);
const SignUpWithContext = withContext(SignUp);
const CoursesWithContext = withContext(Courses)
const CourseDeatilWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse)
const SignOutWithContext = withContext(SignOut)
const PrivateRouteWithContext = withContext(PrivateRoute)

function App() {
  return (
    <BrowserRouter>
    <Provider>
    <div className="App">
        <Header />
          <Routes>
            <Route path='/' element={<CoursesWithContext /> }/>
            <Route path='/courses/:id' element={<CourseDeatilWithContext /> }/>
            <Route path='/signin' element={<SignInWithContext />} />
            <Route path='/signup' element={<SignUpWithContext />} />
            <Route path = '/courses/create' element={<PrivateRouteWithContext />}><Route path='' element={< CreateCourseWithContext />} /> </Route>
            <Route path = '/courses/:id/update' element={<PrivateRouteWithContext />}><Route path='' element={< UpdateCourseWithContext />} /> </Route>
            <Route path='/signout' element={<SignOutWithContext />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
    </div>
    </Provider>
    </BrowserRouter>
  );
}


export default App;
