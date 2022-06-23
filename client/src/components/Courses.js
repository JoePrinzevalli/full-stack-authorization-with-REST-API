import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Courses = () => {

    const [courses, setCourses]= useState( [] );

    useEffect( () => {
        axios.get('http://localhost:5000/api/courses')
            .then(res => {setCourses(res.data); })
            .catch(err => console.log('Error fetching and parsing data', err))
    }, [])

 

    return(
        <main>
            <div class="wrap main--grid">

            <li>{courses.map(course => `<a class="course--module course--link" href="course-detail.html">
                    <h2 class="course--label">Course</h2>
                    <h3 class="course--title">${course.title}</h3>
                </a>`)}</li>
                <a class="course--module course--add--module" href="create-course.html">
                    <span class="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </a> 
            </div>
        </main>
    )
}

export default Courses;