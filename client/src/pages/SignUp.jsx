/* eslint-disable react/no-unescaped-entities */
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    // min-h-screen is a utility class that sets the minimum height of the element to 100vh: i added the min-h-screen to push down the footer
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
      {/* left */}
      <div className="flex-1">
        {/* logo */}
        <Link to="/" className='font-bold dark:text-white text-4xl md:text-2xl'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>The Tech Chronicles.</span>
        </Link>
        <p className="text-sm text-wrap mt-5">
           Sign up today to stay updated on the latest tech news and insights!
        </p>
      </div>
      {/* right */}
      <div className="flex-1">
        <form className='flex flex-col gap-4'>
          <div>
            <Label value='Your username:'/>
            <TextInput 
              type='text'
              placeholder='username'
              id='username'
              className='w-full'
            />
          </div>
          <div>
            <Label value='Your email:'/>
            <TextInput 
              type='email'
              placeholder='name@gmail.com'
              id='email'
              className='w-full'
            />
          </div>
          <div>
            <Label value='Your password:'/>
            <TextInput 
              type='password'
              placeholder='password'
              id='password'
              className='w-full'
            />
          </div>
            <Button gradientDuoTone='purpleToBlue' type='submit'>
              Sign Up
            </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have an account?</span>
          <Link to='/signin' className='text-blue-500'>
              Sign In
          </Link>
        </div>
      </div>
      </div>
    </div>
  )
}


// about page
// Welcome to The Tech Chronicles, your ultimate destination for all things tech. Here, we explore the vast expanse of technology, covering the latest developments, trends, and innovations. From coding and software development to artificial intelligence, cybersecurity, gadgets, and more, we'll dive into the technologies shaping our world. Join us on this journey through the tech universe, where the boundaries of possibility are constantly expanding. Stay tuned for insightful articles, news, and updates on the ever-evolving world of technology. Welcome to The Tech Chronicles – where the future is now.