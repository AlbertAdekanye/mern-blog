import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-gray-300'>
      <div className="w-full max-w-7xl mx-auto ">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          {/* logo */}
          <div className="">
            <Link to="/" className='font-bold dark:text-white text-4xl md:text-2xl'>
              <img src={logo} alt='logo'  className='w-52'/>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 ">
            {/* about section */}
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link 
                  to='#'
                  className='hover:text-gray-600'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Us
                </Footer.Link>
                <Footer.Link 
                  to='#'
                  className='hover:text-gray-600'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FAQs
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* contact section */}
            <div>
              <Footer.Title title='Follow Us' />
              <Footer.LinkGroup col>
                <Footer.Link 
                  to='https://github.com/AlbertAdekanye'
                  className='hover:text-gray-600'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link 
                  to='https://www.frontendmentor.io/profile/AlbertAdekanye'
                  className='hover:text-gray-600'
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Frontend Mentor
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* legal section */}
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link 
                  to='#'
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link 
                  to='#'
                >
                  Term &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href='#' by="Tech Chronicles" year={new Date().getFullYear()}/>
          {/* icons */}
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://www.facebook.com/herbert.adekanye/' icon={BsFacebook}/>
            <Footer.Icon href='https://www.instagram.com/kanyecode/' icon={BsInstagram}/>
            <Footer.Icon href='https://x.com/adekanye_albert' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/AlbertAdekanye' icon={BsGithub}/>
          </div>
        </div>
      </div>
    </Footer>
  );
} 
