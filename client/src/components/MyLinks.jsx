import { useState, useEffect } from "react";
import axios from "axios";
import LinkCard from "./LinkCard";

function MyLinks({ handleContent }) {
    const [links, setLinks] = useState({ urls: [], status: null });

    useEffect(() => {
        async function fetchLinks() {
            try {
                const res = await axios.get('http://localhost:8080/api/v1/user/Urls', { withCredentials: true });
                setLinks({ urls: res.data.data.urls, status: res.status });
            } catch (e) {
                console.log("Error fetching links: ", e);
            }
        }
        fetchLinks();
    }, []);

    async function handleDelete(shortID) {
        try {
            await axios.delete(`http://localhost:8080/api/v1/user/deleteUrl?shortID=${shortID}`, { withCredentials: true });
            setLinks(prevLinks => ({
                ...prevLinks,
                urls: prevLinks.urls.filter((link) => link.shortID !== shortID)
            }));
        } catch (e) {
            console.log("Error deleting link: ", e);
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Your Links</h2>
            <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                {links.urls.slice().reverse().map((link) => (
                    <LinkCard
                        key={link._id}
                        shortID={link.shortID}
                        originalURL={link.originalURL}
                        date={new Date(link.date).toLocaleDateString('en-gb')}
                        handleContent={handleContent}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
}

export default MyLinks;