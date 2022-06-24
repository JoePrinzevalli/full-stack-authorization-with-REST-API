import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { Provider } from './Context';

// import withContext from './Context';
import Courses from "./components/Courses";
import Header from "./components/Header";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDeatil';
import SignOut from './components/SignOut';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
    {/* <Provider> */}
    <div className="App">
        <Header />
          <Routes>
            <Route path='/' element={<Courses /> }/>
            <Route path='/courses/:id' element={<CourseDetail /> }/>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/courses/create' element={<CreateCourse />} />
            <Route path='/courses/:id/update' element={<UpdateCourse />} />
            {/* <Route path='/signout' element={<SignOut />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
    </div>
    {/* </Provider> */}
    </BrowserRouter>
  );
}


export default App;
