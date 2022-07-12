import React, { useEffect, useState, useContext } from "react";
import { Context } from '../Context';
import { useNavigate, useParams  } from 'react-router-dom';
import axios from 'axios';

const UpdateCourse = () => {

    const navigate = useNavigate();
    const context = useContext(Context);
    var {id} = useParams()
    let [title, setTitle] = useState ('');
    const [description, setDescription] = useState ('');
    const [estimatedTime, setEstimatedTime] = useState ('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [userId, setUserId] = useState(context.authenticatedUser.id);
    const [errors, setErrors] = useState( [] );


    
//this fucntion updates a coruse 
    const courseUpdate = async e => {
        e.preventDefault();
        setErrors([]);
        const authCred = btoa(`${context.authenticatedUser.emailAddress}:${context.authenticatedPassword}`)
        const res = await fetch(`http://localhost:5000/api/courses/${id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${authCred}`
            },
            body: JSON.stringify({
                title,
                description,
                estimatedTime,
                materialsNeeded,
                userId}),
        })
        if (res.status === 204) {
            navigate('/');
          } else if (res.status === 400) {
            res.json()
              .then(data => {
                setErrors(data.errors)
                console.log(data);
              });
          } else {
            console.log(res.status);
            throw new Error();
          }
          //res,status returns 200 seems like wokring but not updating
    };
    

    useEffect( () => {
        axios.get(`http://localhost:5000/api/courses/${id}`)             
         .then(res => {
             setTitle(res.data.title);
             setDescription(res.data.description);
             setEstimatedTime(res.data.estimatedTime);
             setMaterialsNeeded(res.data.materialsNeeded);
             }) 
         .catch(err => {console.log('Oh No! Something went wrong fetching the data-->', err);})
         }, [id],);
                
     const cancelButton = e => {
         e.preventDefault();
         navigate(`/`);
     }

     const errorHandler = errors.length 
     ? 
     (<div className='validation--errors' >
         <h3>Validation Errors</h3>
         <ul>{errors.map((error, i) => {return (<li key={i}>{error}</li>)})}</ul>
     </div>)
     : 
     ( null )
 

    return(
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                {errorHandler}
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                            onChange={ e => setTitle(e.target.value)}
                            id="courseTitle" 
                            name="courseTitle" 
                            type="text"
                            value={title}
                            />

                            <p>By {context?.authenticatedUser ? `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}` : ''}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                            id="courseDescription" 
                            name="courseDescription"
                            onChange={ e => setDescription(e.target.value)}
                            value={description}>
                            </textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                            id="estimatedTime" 
                            name="estimatedTime" 
                            type="text" 
                            onChange={ e => setEstimatedTime(e.target.value)}
                            value={estimatedTime}
                            />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded"
                            onChange={ e => setMaterialsNeeded(e.target.value)}
                            value={materialsNeeded}>
                            </textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={courseUpdate}>Update Course</button>
                    <button className="button button-secondary" onClick={cancelButton}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default UpdateCourse;