import { Link } from 'react-router-dom';

export default function SideBar({ handleSidebarActions, active, isOpen, setIsOpen }) {
    const menuItems = [
        { id: 'noselect', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'newlink', label: 'New Link', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
        { id: 'listlinks', label: 'My Links', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
    ];

    return (
        <>
            <div
                className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 transition-opacity duration-200 ease-in-out ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
            ></div>
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transition duration-200 ease-in-out transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } z-30 md:relative md:translate-x-0`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <Link to="/" className="text-xl font-semibold text-gray-800">LinkiFy</Link>
                    <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="mt-5">
                    {menuItems.map((item) => (
                        <a
                            key={item.id}
                            onClick={() => handleSidebarActions(item.id)}
                            className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer ${
                                active === item.id ? 'bg-gray-100 text-gray-800' : ''
                            }`}
                        >
                            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
}
