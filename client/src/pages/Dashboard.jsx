import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { AuthContext } from '../context/AuthContext';
import {useContext, useEffect, useState, useRef} from 'react';    
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import NoSelectScreen from '../components/NoSelectionScreen';
import NewLinkBox from '../components/NewLinkForm';
import MyLinks from '../components/MyLinks';
import AnalyticsGrid from '../components/AnalyticsGrid';
function Dashboard()
{
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
    const [content, setContent] = useState('noselect');
    const navigate = useNavigate();
    const shortID=useRef(null);
    function handleLogout()
    {
        axios.get('http://localhost:8080/api/v1/user/logout', {withCredentials: true});
        localStorage.removeItem('userData');
        setIsLoggedIn(false);
        alert('You have been logged out successfully!')
        navigate('/');
    
    }
  useEffect(() => {
        async function checkLoggedIn() {
            try {
              const res = await axios.get('http://localhost:8080/api/v1/user/isLoggedIn', {withCredentials: true});
              setIsLoggedIn(true);
              
            } catch (e) {
                alert('You are not logged in! Please login to continue');
                setIsLoggedIn(false);
               navigate('/');
              console.log("yeah, you are not logged in ");
            }
          }
          checkLoggedIn();
         
    },[]);
    function handleCurrentContent(val, urlID=null)
    {
        setContent(val);
        shortID.current=urlID;
    }

    let currentContent=null;
    if(content==='noselect')
    {
        currentContent=<NoSelectScreen handleButtonActions={handleCurrentContent}/>
    }
    else if(content==='newlink')
    {
        currentContent=<NewLinkBox/>
    }
    else if(content==='listlinks')
    {
        currentContent=<MyLinks handleContent={handleCurrentContent}/>
    }
    else if(content==='analytics')
    {
        currentContent=<AnalyticsGrid shortID={shortID.current}/>
    }

    return(
        <div className='flex flex-row justify-between'>
            <div className="h-[100%] w-[100%] rounded-[300px] absolute z-[-1] blur-[240px] bg-gradient-to-r from-[#A1D1FD] via-[#daecfd] to-[#FFC56F]"></div>
            <Header onLogout={handleLogout}/>
            <SideBar handleSidebarActions={handleCurrentContent} active={content}/>
            {currentContent}
            </div>
        
    );
}
export default Dashboard;