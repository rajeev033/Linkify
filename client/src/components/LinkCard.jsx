function LinkCard({ shortID, originalURL, date, handleContent, onDelete }) {
  function handleCopy() {
    navigator.clipboard.writeText(`http://localhost:8080/${shortID}`);
    setTimeout(() => alert("Link copied to clipboard"), 150);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300">
      <div className="flex justify-between items-start">
        <div className="flex-grow">
          <a href={`http://localhost:8080/${shortID}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium mb-2 block hover:underline">
            {`http://localhost:8080/${shortID}`}
          </a>
          <p className="text-gray-500 text-sm mb-1">{originalURL.length > 50 ? originalURL.slice(0, 20) + '...' : originalURL}</p>
          <p className="text-gray-400 text-xs">{date}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <button className="text-indigo-600 hover:text-indigo-800 text-sm" onClick={handleCopy}>Copy</button>
          <button className="text-red-600 hover:text-red-800 text-sm" onClick={() => onDelete(shortID)}>Delete</button>
          <button className="text-green-600 hover:text-green-800 text-sm" onClick={() => handleContent("analytics", shortID)}>Analytics</button>
        </div>
      </div>
    </div>
  );
}

export default LinkCard;
