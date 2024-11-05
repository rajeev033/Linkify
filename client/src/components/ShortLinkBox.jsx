import axios from "axios";
import { useState, useRef } from "react";
import {Copy} from 'lucide-react'
function ShortLinkBox() 
{
  const [shortLinkState, setShortLinkState] = useState({status: "idle", data: ""});
  const inputRef = useRef();
  async function shortenLink() {
    
    if(!inputRef.current.value)
    {
        setShortLinkState({status:"error", data:"Please enter a URL"});
        return
    }
    
    try{

        
      const response=await axios.post("http://localhost:8080/api/v1/url/public/shortenURL", {originalURL: inputRef.current.value},  {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log(response);
        setShortLinkState({status:"linkCreated", data:`http://localhost:8080/${response.data.data["shortID"]}`});
    }
    catch(e)
    {
        setShortLinkState({status:"error", data:+e.message})
    }
  }
  function handleCreateAnotherLink()
  {
    setShortLinkState({status:"idle", data:""});
  }
  function copyToClipboard() {
    navigator.clipboard.writeText(shortLinkState.data);
  }
  function handleKeyDown(e) {

    if (e.key === "Enter") 
    {
      shortLinkState.status ? handleCreateAnotherLink() : shortenLink();  
    }
  }

  return (
    <div className="bg-white rounded-md border-[1px] p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {shortLinkState.status==='idle' || shortLinkState.status==='error' ? "Shorten Your Link:" : "Your Short Link:" }
      </h2>
      
      {shortLinkState.status==='linkCreated' ? (
        <div className="mb-6 flex justify-center gap-4 items-center">
          <a className="text-indigo-600 block text-lg font-medium break-all text-center" href={shortLinkState.data}>{shortLinkState.data}</a>
          <Copy size={20} color="gray"className="cursor-pointer" onClick={copyToClipboard}/>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center">
        <input
          type="text"
          ref={inputRef}
          required={true}
          placeholder="Enter long link"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
        />
        {shortLinkState.status==='error' && <p className="text-red-600 text-sm mb-6 text-center border-red-600 border-[1px] w-full py-3 rounded-md">{shortLinkState.data}</p>}
        </div>
      )}
      
      <button
        onClick={shortLinkState.status==='idle' || shortLinkState.status==='error' ? shortenLink: handleCreateAnotherLink }
        onKeyDown={handleKeyDown}
        className="w-full bg-black text-white font-medium py-3 px-4 rounded-md hover:bg-gray-800 transition duration-300"
      >
        {shortLinkState.status==='idle' || shortLinkState.status==='error' ?"Create Short Link": "Create Another Link" }
      </button>
    </div>
  );
}
export default ShortLinkBox;