import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {

    // const history = useNavigate();
    const context = useContext(Context);
    const navigate = useNavigate();
    const [errors, setErrors] = useState( [] );
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [userId, setUserId] = useState(context.authenticatedUser.id);

    const handleSubmit = async e => {
        e.preventDefault();
        context.actions.createCourse( title, description, estimatedTime, materialsNeeded, userId, context.authenticatedUser.emailAddress, context.authenticatedPassword )
        .then( errors => {
            if (errors) {
                setErrors(errors);
            } else {
                navigate('/')
                console.log(context.actions.createCourse);
                //else put new course in home page
            }
        })
    }
    

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
                <form onSubmit={ handleSubmit }>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={ (e) => setTitle(e.target.value) } />

                            <p>By {context?.authenticatedUser 
                            ? 
                            `${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}` 
                            : 
                            ''}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description} onChange={ (e) => setDescription(e.target.value) }></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={ (e) => setEstimatedTime(e.target.value) } />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={ (e) => setMaterialsNeeded(e.target.value) }></textarea>
                        </div>
                    </div>
                    <button className="button" onClick={ handleSubmit }>Create Course</button>
                    <button className="button button-secondary" onClick={ handleCancel }>Cancel</button>
                </form>
            </div>
        </main>
    )
}


export default CreateCourse;