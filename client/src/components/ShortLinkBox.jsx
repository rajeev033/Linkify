import Button from "./Button";
import axios from "axios";
import { useState, useRef } from "react";
function ShortLinkBox() 
{
  const [shortLink, setShortLink] = useState("");
  const inputRef = useRef();
  async function shortenLink() {
    try{

        const response=await axios.post("http://localhost:8080/api/v1/url/public/shortenURL", {originalURL: inputRef.current.value},  {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log(response);
        setShortLink(`http://localhost:8080/${response.data.data["shortID"]}`);
    }
    catch(e)
    {
        setShortLink("Error: "+e.message)
    }
  }
  function handleCreateAnotherLink()
  {
    setShortLink("");
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {shortLink ? "Your Short Link:" : "Shorten Your Link:"}
      </h2>
      
      {shortLink ? (
        <div className="mb-6">
          <p className="text-indigo-600 text-lg font-medium break-all">{shortLink}</p>
        </div>
      ) : (
        <input
          type="text"
          ref={inputRef}
          required={true}
          placeholder="Enter long link"
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
        />
      )}
      
      <button
        onClick={shortLink ? handleCreateAnotherLink : shortenLink}
        className="w-full bg-indigo-600 text-white font-medium py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
      >
        {shortLink ? "Create Another Link" : "Create Short Link"}
      </button>
    </div>
  );
}
export default ShortLinkBox;