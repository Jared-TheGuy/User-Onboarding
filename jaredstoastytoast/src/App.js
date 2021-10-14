import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Card from './components/Card';
import Form from './components/Form';
import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import schema from './validation/formSchema';



const initialUsers = [
  {name: "Jared",
  email: "jbatesbaker@yahoo.com",
  password: "stuffy",
  }
]



function App() {

  const initialFormValues = {
    name: '',
    email: '',
    password: '',
    TOS: 'off',
  
  }

  const [formValues, setFormValues] = useState(initialFormValues);
  const [users, setUsers] = useState(initialUsers);
  const [formErrors, setFormErrors] = useState();
  const [disabled, setDisabled] = useState();

  const stateSpace = {
      formValues: formValues,
      setFormValues: setFormValues,
      users: users,
      setUsers: setUsers,
      formErrors: formErrors,
      setFormErrors: setFormErrors,
      disabled: disabled,
      setDisabled: setDisabled
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(res => {
      setUsers([res.data, ...users]);
    }).catch(err => {
      console.error(err);
    }).finally(() => {
      setFormValues(initialFormValues);
    })
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({...formErrors, [name]: ''}))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      TOS: formValues.TOS
    }
    postNewUser(newUser);
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])
  
  return (
    <div className="App">
      <Header />
      <div className="contentContainer">
      <Form stateSpace={stateSpace} formSubmit={formSubmit} inputChange={inputChange}/>
      <div className="cardHolder">
        {
          users.map((person, idx) => (
            <Card user={person} key={idx} stateSpace={stateSpace} formSubmit={formSubmit} inputChange={inputChange} initialFormValues={initialFormValues}/>
          ))
        }       
      </div>
      </div>
    </div>
  );
}

export default App;
