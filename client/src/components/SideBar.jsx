
export default function SideBar({handleSidebarActions, active}) 
{
    return (
        <div className="mt-[14dvh]  bg-[#ffffff98] border rounded-[24px] w-[20dvw] h-[80dvh] pt-[2rem] flex flex-col justify-start items-center ml-[1rem]">
            <div className="buttonContainer border-b-[0.8px] pb-[1.5rem] border-[#d8d8d8]">
                <button onClick={()=>{handleSidebarActions("newlink")}} className="bg-[#000000] hover:scale-[1.05] text-white font-bold py-2 px-4 rounded-[24px] transition-[all] w-[12rem]">Create New Link</button>
            </div>

            <div className="flex flex-col justify-center items-center h-[40%]">
                <button className={`bg-[#ffffff00] hover:scale-[1.05]  ${active==='noselect'?'text-[#ff583b] border-[#ff583b]':'text-black border-black'} border-[2px] font-bold py-1 px-2 rounded-[24px] w-[6rem] h-[2rem] text-center text-[1rem] leading-[1rem] max-[524px]:w-[70dvw] max-[524px]:text-[1rem] max-[524px]:h-[2.5rem] transition-all m-[0.5rem]`} onClick={()=>{handleSidebarActions("noselect")}}>Home</button>
                <button className={`bg-[#ffffff00] hover:scale-[1.05] ${active==='listlinks'?'text-[#ff583b] border-[#ff583b]':'text-black border-black'} border-[2px] font-bold py-1 px-2 rounded-[24px] w-[6rem] h-[2rem] text-center text-[1rem] leading-[1rem] max-[524px]:w-[70dvw] max-[524px]:text-[1rem] max-[524px]:h-[2.5rem] transition-all m-[0.5rem]`} onClick={()=>{handleSidebarActions("listlinks")}}>My Links</button>
            </div>
            
        </div>
    )
 }
