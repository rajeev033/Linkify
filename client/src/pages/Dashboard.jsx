import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import NoSelectScreen from '../components/NoSelectionScreen';
import NewLinkBox from '../components/NewLinkForm';
import MyLinks from '../components/MyLinks';
import AnalyticsGrid from '../components/AnalyticsGrid';

function Dashboard() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const [content, setContent] = useState('noselect');
    const [selectedShortID, setSelectedShortID] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkLoggedIn() {
            try {
                await axios.get('http://localhost:8080/api/v1/user/isLoggedIn', { withCredentials: true });
                setIsLoggedIn(true);
            } catch (e) {
                setIsLoggedIn(false);
                navigate('/login');
            }
        }
        checkLoggedIn();
    }, [setIsLoggedIn, navigate]);

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8080/api/v1/user/logout', { withCredentials: true });
            localStorage.removeItem('userData');
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleContentChange = (newContent, urlID = null) => {
        setContent(newContent);
        setSelectedShortID(urlID);
        setSidebarOpen(false);
    };

    const renderContent = () => {
        switch (content) {
            case 'noselect':
                return <NoSelectScreen handleButtonActions={handleContentChange} />;
            case 'newlink':
                return <NewLinkBox />;
            case 'listlinks':
                return <MyLinks handleContent={handleContentChange} />;
            case 'analytics':
                return <AnalyticsGrid shortID={selectedShortID} />;
            default:
                return <NoSelectScreen handleButtonActions={handleContentChange} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <SideBar 
                handleSidebarActions={handleContentChange} 
                active={content} 
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onLogout={handleLogout} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex overflow-x-hidden  bg-gray-50 mt-[5rem] py-5">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;