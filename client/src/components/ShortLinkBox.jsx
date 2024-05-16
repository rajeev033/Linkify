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
    <div className=" border-[#cccccc] border-[1px] h-[50dvh] w-[30dvw] py-[2rem] px-[1rem] bg-white bg-opacity-[0.39] shadow-md  rounded-[24px] flex flex-col items-center justify-evenly max-[424px]: w-[80dvw] mx-auto">
      <h2><span className="bg-gradient-to-r from-[#D10081] to-[#FFA800] text-transparent bg-clip-text text-[2rem] max-[424px]:text-[1.6rem]">{shortLink?"Your Short Link:":"Shorten Your Link:"}</span></h2>
      
        {shortLink?<p>{shortLink}</p>:<input type="text" ref={inputRef} required={true} placeholder="Enter long link" className="rounded-[8px] h-[20%] w-[75%] my-1 py-2 px-3 bg-[#ffffff] shadow"/>}
        {shortLink?<Button onClick={handleCreateAnotherLink}>Create Another Link</Button>:<Button onClick={shortenLink}>Create Short Link</Button>}
      
    </div>);
}
export default ShortLinkBox;