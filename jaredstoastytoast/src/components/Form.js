import React from 'react';

export default function Form(props) {

    // const {
    //     inputChange,
    //     formSubmit,

    // } = props;

    console.log(props)

    const onChange = evt => {
    const {name, value, checked, type} = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    props.inputChange(name, valueToUse);
    }

    const onSubmit = evt => {
        evt.preventDefault()
        props.formSubmit()
        props.stateSpace.setFormValues(props.initialFormValues);
    }



    return (
        <div className="form">
            <form onSubmit={onSubmit}>
                <input placeholder="Name" name="name" value={props.stateSpace.name} onChange={onChange}/>
                <input placeholder="Email" name="email" value={props.stateSpace.email} onChange={onChange}/>
                <input placeHolder="Password" name="password" value ={props.stateSpace.email} onChange={onChange}/>
                <input type="checkbox"/>
                <label>TOS</label>
                <button>Submit</button>
            </form>
        </div>
    )
}