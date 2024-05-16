import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Link as ScrollLink} from 'react-scroll';
import { AuthContext } from '../context/AuthContext';
import {useContext} from 'react';
export default function Header({onLogout}) 
{
  const [isMenuActive, setMenuActive] = useState(false);
  const {isLoggedIn} = useContext(AuthContext);
  const handleMenuButton = () => {
    setMenuActive(!isMenuActive);
  }
  useEffect(() => {
    window.addEventListener("resize", ()=>{
      if(window.innerWidth>524)
      {
        setMenuActive(false);
      }
    })
  },[]);
  return (
    <header>
      <nav className={`flex items-center justify-between py-4 fixed top-0 w-[100%] h-[12dvh] bg-[#ffffff11] ${!isMenuActive?"backdrop-blur-[10px]":""}`}>
        <div className="ml-5 z-[3]">
          <h1 className="text-2xl font-bold">LinkiFy</h1>
        </div>
        <div className={isMenuActive?"fixed right-0 top-0 h-[100vh] flex flex-col justify-center items-center w-[100dvw] backdrop-blur-[10px] bg-[#ffffff5d] opacity-[1] mydiv":"flex items-center  justify-between grow max-[524px]:h-[0vh] max-[524px]:overflow-hidden"}>

         {!isLoggedIn? <ul className={isMenuActive?"flex flex-col gap-6 mb-[5rem] text-black items-center text-[1.4rem]":"flex justify-center gap-3 mr-auto ml-auto pl-[4rem] text-gray-700 z-[10]"}>
            <li className="hover:text-black cursor-pointer"><ScrollLink to='hero-st'>Home</ScrollLink></li>
            <li className="hover:text-black cursor-pointer"><ScrollLink to="feat">Features</ScrollLink></li>
           
          </ul>:null}
         {!isLoggedIn? <div className="flex gap-3 mr-5 py-[1rem] z-[3] max-[524px]:flex-col max-[524px]:justify-center max-[524px]:items-center max-[524px]:mx-0">
           <Link to="/login"> <button className={`border-[black] border-[2px] hover:scale-[1.05] text-black font-bold py-1 px-2 rounded-[24px] w-[5rem] h-[2rem] text-center text-xs leading-[1rem] max-[524px]:w-[70dvw] max-[524px]:text-[1rem] max-[524px]:h-[2.5rem] transition-all`}>
              Login</button></Link>
           <Link to="/register"> <button className="bg-black hover:scale-[1.05] text-white font-bold py-1 px-2 rounded-[24px] w-[5rem] h-[2rem] text-center text-xs leading-[1rem] max-[524px]:w-[70dvw] max-[524px]:text-[1rem] max-[524px]:h-[2.5rem] transition-all">
            Sign up</button></Link>
          </div>:<button onClick={onLogout} className="bg-black hover:scale-[1.05] text-white font-bold py-1 px-2 rounded-[24px] w-[5rem] h-[2rem] text-center text-xs leading-[1rem] max-[524px]:w-[70dvw] max-[524px]:text-[1rem] max-[524px]:h-[2.5rem] transition-all block ml-auto mr-[1.4rem]">
              Logout</button>}
          
        </div>
        <div className="hidden max-[524px]:block text-black z-10 mr-[2rem] z-10"><button onClick={handleMenuButton}>Menu</button></div>
        
      </nav>
    </header>
  );
}
