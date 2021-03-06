import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';


const CreateCourse = () => {

    // const history = useNavigate();
    const context = useContext(Context);
    const navigate = useNavigate();
    const [errors, setErrors] = useState( [] );
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    // const [userId, setUserId] = useState(context.authenticatedUser.id);
   

    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     context.actions.createCourse( title, description, estimatedTime, materialsNeeded, userId, context.authenticatedUser.emailAddress, context.authenticatedPassword )
    //     .then( errors => {
    //         if (errors) {
    //             setErrors(errors);
    //         } else {
    //             navigate('/')
    //             console.log(context.actions.createCourse);
    //             //else put new course in home page
    //         }
    //     })
    // }

    //thiss fucntion creates courses
    const courseCreate = async e => {
        e.preventDefault();
        setErrors([]);
        const authCred = btoa(`${context.authenticatedUser.emailAddress}:${context.authenticatedPassword}`);
        const res = await fetch('http://localhost:5000/api/courses/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${authCred}`, 
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description, 
                estimatedTime: estimatedTime, 
                materialsNeeded: materialsNeeded, 
                userId: context.authenticatedUser.id}),
        })
        if (res.status === 201) {
            navigate('/');
          } else if (res.status === 400) {
            res.json()
              .then(data => {
                setErrors(data.errors)
              });
          } else {
            Error();
          }
    }

    //this fucntion retursn user to home screen
        const handleCancel = (e) => {
            e.preventDefault();
            navigate('/');
        }

    const errorHandler = errors.length 
    ?  
    (<div className="validation--errors">
        <h3>Validation Errors</h3>
            <ul>{errors.map((error, i) => {return (<li key={i}>{error}</li>)})}</ul>
    </div>) 
    : 
    null

    return(
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                { errorHandler }
                {/* <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value htmlFor"Title"</li>
                        <li>Please provide a value htmlFor"Description"</li>
                    </ul>
                </div> */}
                <form onSubmit={ courseCreate }>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                            id="courseTitle" 
                            name="courseTitle" 
                            type="text" 
                            value={title} 
                            onChange={ (e) => setTitle(e.target.value) } 
                           />

                            {/* <p>By {context?.authenticatedUser 
                            ? 
                            `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}` 
                            : 
                            ''}</p> */}
                            <p>By {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                            id="courseDescription" 
                            name="courseDescription" 
                            value={description} 
                            onChange={ (e) => setDescription(e.target.value) }
                            > 
                            </textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                            id="estimatedTime" 
                            name="estimatedTime" 
                            type="text" 
                            value={estimatedTime} 
                            onChange={ (e) => setEstimatedTime(e.target.value) } 
                           />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                          
                            <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded" 
                            value={materialsNeeded} 
                            onChange={ (e) => setMaterialsNeeded(e.target.value) 
                            }>
                            {/* <ul>
                                <ReactMarkdown>{materialsNeeded}</ReactMarkdown>
                            </ul> */}
                            </textarea>
                            
                        </div>
                    </div>
                    <button className="button" onClick={ courseCreate }>Create Course</button>
                    <button className="button button-secondary" onClick={ handleCancel }>Cancel</button>
                </form>
            </div>
        </main>
    )
}


export default CreateCourse;