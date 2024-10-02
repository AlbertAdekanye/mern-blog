/* eslint-disable react/no-unescaped-entities */
import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch} from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
// import logo from '../assets/logo.png';

export default function Header() {
  const path= useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector((state) => state.theme);
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (

    // Navbar from flowbite-react
    <Navbar className='border-b-2'>
      {/* link from react router-dom */}
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className=''>The Tech Chronicles</span>
      </Link>
      {/* search input */}
      <form>
        <TextInput 
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color= 'gray' pill>
        <AiOutlineSearch /> 
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button 
          className='w-12 h-10 hidden
          sm:inline'
          color='gray'
          pill 
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown 
            arrowIcon={false}
            inline
            label={
              <Avatar 
                alt='user'
                img={currentUser.profilePicture}
                rounded
              />
            }
            outline
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ): 
          (

            <Link to='/signin'>
              <Button outline>
                Sign In
              </Button>
            </Link>
          )
        }
        <Navbar.Toggle />
      </div>
      
      {/* Nav link */}
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={'div'}>
          <Link to='/'>
              Home
          </Link>
        </Navbar.Link>

        <Navbar.Link active={path === "/about"} as={'div'}>
           <Link to='/about'>
              About
            </Link>
        </Navbar.Link>

          <Navbar.Link active={path === "/projects"} as={'div'}>
            <Link to='/projects'>
              Projects
            </Link>
          </Navbar.Link>
      </Navbar.Collapse> 
    </Navbar>
    
  )
}