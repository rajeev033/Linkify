import LinkCard from "./LinkCard";
import { useState, useEffect } from "react";
import axios from "axios";
function MyLinks({handleContent})
{
    const [links, setLinks] = useState({urls:[], status:null});
    useEffect(() => {
        async function fetchLinks() {
            try {
                const res = await axios.get('http://localhost:8080/api/v1/user/Urls', { withCredentials: true });
                setLinks({urls:res.data.data.urls, status:res.status});
                console.log(links.urls);

            } catch (e) {
                console.log("Error fetching links: ", e);
            }
        }
        fetchLinks();
    }, []);
    async function handleDelete(shortID)
    {
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/user/deleteUrl?shortID=${shortID}`, { withCredentials: true });
            console.log(res);
            setLinks({urls:links.urls.filter((link)=>link.shortID!==shortID), status:res.status});
            console.log(links.urls);
        } catch (e) {
            console.log("Error deleting link: ", e);
        }
    }
    return (
        <div className="flex flex-col items-center justify-start bg-[#ffffffbb] text-center rounded-lg p-8 w-[50dvw] ml-[1rem] mr-[1rem] flex-grow h-[80dvh] mt-[14dvh] overflow-y-scroll overflow-x-hidden">
            <h1 className="text-2xl font-bold my-4">Your Links</h1>
            {links.urls.slice().reverse().map((link) => {
                const date=new Date(link.date).toLocaleDateString('en-gb'); 
                console.log(date);
                  
                return <LinkCard key={link._id} shortID={link.shortID} originalURL={link.originalURL} date={date} handleContent={handleContent} onDelete={handleDelete}/>
})}
        </div>
    );
}
//key={link._id} link={link}
export default MyLinks;