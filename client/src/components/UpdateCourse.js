import React, { useEffect, useState } from "react";
import { Context } from '../Context';
import { useNavigate, useParams  } from 'react-router-dom';
import axios from 'axios';

const UpdateCourse = () => {

    const navigate = useNavigate();
    const {id} = useParams()
    const [title, setTitle] = useState ('');
    const [description, setDescription] = useState ('');
    const [estimatedTime, setEstimatedTime] = useState ('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    // const [user, setUser] = useState('');
    const [errors, setErrors] = useState( [] );

    const courseUpdate = async e => {
        e.preventDefault();
        setErrors([]);
        const authCred = btoa(`${Context.authenticatedUser.emailAddress}:${Context.authenticatedPassword}`)
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${authCred}`
            },
            body: JSON.stringify({
                title,
                description,
                estimatedTime,
                materialsNeeded}),
        });
        if (res.status === 204) {
            navigate('/');
          } else if (res.status === 403) {
            navigate('/forbidden');
          } else if (res.status === 400) {
            res.json()
              .then(data => {
                setErrors(data.errors)
                console.log(data);
              });
          } else {
            throw new Error();
          }
    };

    useEffect( () => {
        axios.get(`http://localhost:5000/api/courses/${id}`)             
         .then(res => {
             setTitle(res.data.title);
             setDescription(res.data.description);
             setEstimatedTime(res.data.estimatedTime);
             setMaterialsNeeded(res.data.materialsNeeded);
             })
         .catch(err => {console.log('Oh No! Something went wrong fetching the data', err);})
         }, [id]);
                
     const cancelButton = e => {
         e.preventDefault();
         navigate(`/courses/${id}`);
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
                            id="courseTitle" 
                            name="courseTitle" 
                            type="text"
                            onChange={(e) => setTitle(e.target.value)} 
                            value={title}/>

                            <p>By {Context.authenticatedUser  `${Context.authenticatedUser.firstName} ${Context.authenticatedUser.lastName}` }</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                            id="courseDescription" 
                            name="courseDescription"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}>
                            {description}
                            </textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                            id="estimatedTime" 
                            name="estimatedTime" 
                            type="text" 
                            onChange={(e) => setEstimatedTime(e.target.value)}
                            value={estimatedTime}
                            />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded"
                            onChange={(e) => setMaterialsNeeded(e.target.value)}>
                            {materialsNeeded}
                            </textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={courseUpdate}>Update Course</button>
                    <button className="button button-secondary" onclick={cancelButton}>Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default UpdateCourse;