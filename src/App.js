import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Link, Switch, Route, useHistory } from 'react-router-dom';
import axios from 'axios'
import './App.css';
import SignIn from './SignInPage.jsx';
import Register from './RegisterPage.jsx';
import FormSchema from './FormSchema.js';
import defaultURL from './utils/apiHook'

const initialSignIn = {
  username: '',
  password: '',
  user: {
    client: false,
    instructor: false,
  },
}

const initialErrors = {
  username: '',
  password: '',
}

const initialDisabled = true

function App() {

  const [signIn, setSignIn] = useState(initialSignIn)
  const [disabled, setDisabled] = useState(initialDisabled)
  const [errors, setErrors] = useState(initialErrors)

  const history = useHistory()

  const inputChange = (name, value) => {
    yup
      .reach(FormSchema, name)
      .validate(value)
      .then(valid => {
        setErrors({
          ...errors, [name]: '',
        })
      })
      .catch(error => {
        setErrors({
          ...errors, [name]: error.errors[0],
        })
      })
      setSignIn({...signIn, [name]: value})
  }

  const checkChange = (name, isChecked) => {
    setSignIn({
      ...signIn, users: {
        ...signIn.users, [name]: isChecked,
      }
    })
  }

  const submit = () => {
    axios.post(`${defaultURL()}/signIn`, signIn)
    .then(response => {
      console.log(response)
      localStorage.setItem("token", response.data.payload)
      setSignIn(initialSignIn)
      history.push("/dashboard")
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    FormSchema.isValid(signIn).then(valid => {
      setDisabled(!valid)
    }, [signIn])
  })

  return (
    <div className="App">
      <header>
        <h1>ANYWHERE FITNESS</h1>
        <button>
          <Link to='/'>Home</Link>
        </button>
        <button>
          <Link to='/signin'>Sign In</Link>
        </button>
        <button>
          <Link to='/register'>Register</Link>
        </button>
      </header>
      <Switch>
        <Route exact path='/signin'>
          <SignIn 
          inputchange={inputChange}
          disabled={disabled}
          errors={errors}
          signIn={signIn}
          checkChange={checkChange}
          submit={submit}/>
        </Route>
        <Route exact path='/register'>
          <Register 
          inputchange={inputChange}
          disabled={disabled}
          errors={errors}
          signIn={signIn}
          checkChange={checkChange}
          submit={submit}/>
        </Route>
      </Switch>
     
    </div>
  );
}

export default App;
