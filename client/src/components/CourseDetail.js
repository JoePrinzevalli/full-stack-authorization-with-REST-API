import React, {useState, useEffect, useContext} from 'react';
import { Context } from '../Context';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";

const CourseDetail = () => {

    var {id} = useParams();
    const [courses, setCourse] = useState('');
    const [user, setUser] = useState('');
    const context = useContext(Context);
    const navigate = useNavigate();
    const [errors, setErrors] = useState( [] );
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    // const markdown = `<li> HI </li><li> Bye </li>`
  
    // const markdown = `<li>${courses.materialsNeeded}</li>`
    const markdown = courses.materialsNeeded
    console.log(user);
    console.log(errors);

 

    //gets infromation to dsiplay speicifc course detialss
    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(res => {
                setCourse(res.data);
                setUser(res.data.userId);
                setFirst(res.data.User.firstName)
                setLast(res.data.User.lastName)
                })
            .catch(err => console.log('Error fetching and parsing data', err))
        }, [id])

    //this fucnction deletes a course
    const deleteCourse = e => {
        e.preventDefault();
        const auth = btoa(`${context.authenticatedUser.emailAddress}:${context.authenticatedPassword}`)
        axios.delete(`http://localhost:5000/api/courses/${id}`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Basic ${auth}`
            }})
        .then(res => {
            if(res.status === 401){
                res.json()
              .then(data => {
                setErrors(data.errors)
              })
            } else {
                navigate('/');
            }
        })
        .catch(err => {
            console.log('Error fetching and parsing data', err)
            navigate('/error');
        });
    };
    
    return( 
        
        <main>
            <div className="actions--bar">
                <div className="wrap">
                { context.authenticatedUser && context.authenticatedUser.id === courses.userId 
                ? (
                        <>
                            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                            
                            <Link className="button" to="/" onClick={deleteCourse} >Delete Course</Link>
                        </>
                    ) 
                    : 
                    (null)
                    }
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{courses.title}</h4>
                            <p>By {firstName} {lastName}</p>
                    
                            <ReactMarkdown>{courses.description}</ReactMarkdown>
                            
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{courses.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={markdown} />
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CourseDetail;