/* eslint-disable react/no-unescaped-entities */
import { Alert, Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { HiMail } from "react-icons/hi";
import logo from '../assets/logo.png';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
// import validator from 'validator';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    if (e.target.id === 'remember') {
      const {email, password } = credentials;
      if (e.target.checked) {
        localStorage.setItem('credentials', JSON.stringify({ email, password}));
      } else {
        localStorage.removeItem('credentials');
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedCredentials = localStorage.getItem('credentials');
    if (storedCredentials) {
      const { email, password } = JSON.parse(storedCredentials);
      setCredentials({ email, password });
    }
    //  const form = e.target;
    //  form.submit();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('All fields are required'));
    }
    // validation code for password
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!emailRegex.test(formData.email)) {
      return dispatch(signInFailure('Invalid email address'));
    }
    if (!passwordRegex.test(formData.password)) {
      return dispatch(signInFailure('invalid password'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if(res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    // min-h-screen is a utility class that sets the minimum height of the element to 100vh: i added the min-h-screen to push down the footer
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
      {/* left */}
      <div className="flex-1">
        {/* logo */}
        <Link to="/" className='font-bold dark:text-white text-4xl md:text-2xl'>
        
        </Link>
        <p className="text-sm ">
          <img src={logo} alt='logo'  className=''/>
           Sign in today to stay updated on the latest tech news and insights!
        </p>
      </div>
      {/* right */}
      <div className="flex-1">
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your email:'/>
            <TextInput 
              type='email'
              icon={HiMail}
              placeholder='@gmail.com'
              id='email'
              className='w-full'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value='Your password:'/>
            <TextInput 
              type='password'
              placeholder='*******'
              id='password'
              className='w-full'
              onChange={handleChange}
            />
            <div className="flex items-center gap-2 mt-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
          </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' disable={loading}>
              {loading ? (
                <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign In'}
            </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Don't have an account?</span>
          <Link to='/signup' className='text-blue-500'>
              Sign Up
          </Link>
        </div>
        {
          errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )
        }
      </div>
      </div>
    </div>
  )
}



// about page
// Welcome to The Tech Chronicles, your ultimate destination for all things tech. Here, we explore the vast expanse of technology, covering the latest developments, trends, and innovations. From coding and software development to artificial intelligence, cybersecurity, gadgets, and more, we'll dive into the technologies shaping our world. Join us on this journey through the tech universe, where the boundaries of possibility are constantly expanding. Stay tuned for insightful articles, news, and updates on the ever-evolving world of technology. Welcome to The Tech Chronicles – where the future is now.