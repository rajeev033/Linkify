

function LinkCard({ shortID="www.apple.com", originalURL="www.apple.com", date="12/12/2021", handleContent, onDelete })
{
  
  function handleCopy()
  {
    navigator.clipboard.writeText(`http://localhost:8080/${shortID}`);

    setTimeout(()=>alert("Link copied to clipboard"),150);
  }

  return (
    <div className="bg-[#ffffff] border border-gray-200 rounded-lg p-4 w-[80%] my-5 flex items-start">
      <div className="flex-grow flex flex-col justify-center">
        <a href={`http://localhost:8080/${shortID}`} target="_blank" className="text-[#008E63] font-bold mb-2 block text-[1.11rem]">
          {`http://localhost:8080/${shortID}`}
        </a>
        <div>
            <p className="text-[#A1A1A1] text-sm mb-4">{originalURL.slice(0,32)===originalURL?originalURL:originalURL.slice(0,32)+'...'}</p>
        </div>
        <div>{date}</div>
      </div>
      <div className="flex flex-col items-end space-y-2 mr-4">
        <button className="text-blue-600 cursor-pointer hover:scale-[0.9] transition-all" onClick={handleCopy}>Copy</button>
        <button className="text-red-600 cursor-pointer hover:scale-[0.9] transition-all" onClick={()=>{onDelete(shortID)}}>Delete</button>
        <button className="text-[#008E63] cursor-pointer hover:scale-[0.9] transition-all" onClick={()=>handleContent("analytics", shortID)}>Analytics</button>
      </div>
    </div>
  );
}

export default LinkCard;
