/* eslint-disable react/no-unescaped-entities */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill in all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
           Sign up today to stay updated on the latest tech news and insights!
        </p>
      </div>
      {/* right */}
      <div className="flex-1">
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your username:'/>
            <TextInput 
              type='text'
              placeholder='username'
              id='username'
              className='w-full'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value='Your email:'/>
            <TextInput 
              type='email'
              placeholder='name@gmail.com'
              id='email'
              className='w-full'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value='Your password:'/>
            <TextInput 
              type='password'
              placeholder='password'
              id='password'
              className='w-full'
              onChange={handleChange}
            />
          </div>
            <Button gradientDuoTone='purpleToBlue' type='submit' disable={loading}>
              {loading ? (
                <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
                </>
              ) : 'Sign Up'}
            </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have an account?</span>
          <Link to='/signin' className='text-blue-500'>
              Sign In
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