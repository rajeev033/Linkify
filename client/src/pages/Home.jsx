import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from '../components/Header';
import Hero from '../components/Hero';
import { AuthContext } from '../context/AuthContext';
function Home()
{
  const navigate = useNavigate();
  useEffect( () => {
    async function checkLoggedIn() {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/user/isLoggedIn', {withCredentials: true});
        navigate('/dashboard');
      } catch (e) {
        
        

        console.log(e);
      }
    }
    checkLoggedIn();
  });
  return (
    <>
    <Header/>
      <Hero/>
    

    </>
  )
}
export default Home;