import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/context'
import { Api } from '../../services/Api';
// import { FaPowerOff } from "react-icons/fa6";
import './style.scss';

const Header = () => {
    const {isLoggedIn} = useAuthContext();
    
    const {setAccessToken} =  useAuthContext();

    const logout = () => {
                Api.post('/logout').then((res)=>{
                    console.log("logout response : ", res);
                    setAccessToken("");
                    window.localStorage.clear();
                }).catch((error)=>{
                    console.log("logout error : ",error);
                })
            }

  return (
     <header><nav><Link to={'/'}>Home</Link></nav><nav className='links'>{!isLoggedIn?<Link to={'/register'}>Register</Link>:<Link to={'/about'}>About</Link>}{isLoggedIn?<a href='/' onClick={(e)=>{e.preventDefault(); logout()}} role='button'>Logout</a>:<Link to={'/login'}>Login</Link>}</nav></header>
  )
}

export default Header