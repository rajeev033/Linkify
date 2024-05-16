import Button from "./Button";
import axios from "axios";
import { useState, useRef } from "react";
function NewLinkBox() 
{
  const [shortLink, setShortLink] = useState("");
  const inputRef = useRef();
  async function shortenLink() {
    try{

        const response=await axios.post("http://localhost:8080/api/v1/url/private/shortenURL", {originalURL: inputRef.current.value},  {
            headers: {
              'Content-Type': 'application/json'
            }, 
            withCredentials: true
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
  async function copyLink()
  {
    try
    {
      await navigator.clipboard.writeText(shortLink);
      alert("Link copied to clipboard");
    }
    catch(e)
    {
      console.log(e);
    }
  }


  
  
    return (
      <div className="flex flex-col items-center justify-center bg-[#ffffffbb] text-center rounded-lg p-8 w-[50dvw] ml-[1rem] mr-[1rem] flex-grow h-[80dvh] mt-[14dvh] gap-[1rem]">
       <h2><span className="bg-gradient-to-r from-[#D10081] to-[#FFA800] text-transparent bg-clip-text text-[2rem] max-[424px]:text-[1.6rem]">{shortLink?"Your Short Link:":"Enter Link:"}</span></h2>
      
        <div></div>
        {shortLink?<p className="text-[1.35rem]">{shortLink}</p>:<input type="text" ref={inputRef} required={true} placeholder="long link or URL" className="rounded-[8px] h-[20%] w-[75%] my-1 py-2 px-3 bg-[#ffffff] shadow"/>}
        {shortLink?<button onClick={()=>{copyLink()}} className="bg-[#ffffff00] hover:scale-[1.05] text-black border-[2px] border-black font-bold py-1 px-2 rounded-[24px] w-[5rem] h-[2rem] text-center text-xs leading-[1rem] max-[524px]:w-[70dvw] max-[524px]:text-[1rem] max-[524px]:h-[2.5rem] transition-all">Copy Link</button>:null}
        {shortLink?<Button onClick={handleCreateAnotherLink}>Create Another Link</Button>:<Button onClick={shortenLink}>Create Short Link</Button>}
      
    </div>);
}
export default NewLinkBox;