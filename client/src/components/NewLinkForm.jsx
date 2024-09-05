import { useState, useRef } from "react";
import axios from "axios";

function NewLinkBox() {
  const [shortLink, setShortLink] = useState("");
  const inputRef = useRef();

  async function shortenLink() {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/url/private/shortenURL",
        { originalURL: inputRef.current.value },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      setShortLink(`http://localhost:8080/${response.data.data["shortID"]}`);
    } catch (e) {
      setShortLink("Error: " + e.message);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shortLink);
      alert("Link copied to clipboard");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {shortLink ? "Your Short Link:" : "Create New Link"}
      </h2>
      
      {shortLink ? (
        <div className="mb-6">
          <p className="text-indigo-600 text-lg font-medium break-all mb-4">{shortLink}</p>
          <button onClick={copyLink} className="w-full bg-indigo-100 text-indigo-700 font-medium py-2 px-4 rounded-md hover:bg-indigo-200 transition duration-300 mb-4">
            Copy Link
          </button>
        </div>
      ) : (
        <input
          type="text"
          ref={inputRef}
          required={true}
          placeholder="Enter long link or URL"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
        />
      )}
      
      <button
        onClick={shortLink ? () => setShortLink("") : shortenLink}
        className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
      >
        {shortLink ? "Create Another Link" : "Create Short Link"}
      </button>
    </div>
  );
}

export default NewLinkBox;