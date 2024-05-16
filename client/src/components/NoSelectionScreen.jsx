

function NoSelectScreen({handleButtonActions}) 
{
  const userDataJSON = localStorage.getItem('userData');
  const userData = JSON.parse(userDataJSON);
  return (
    <div className="flex flex-col items-center justify-center bg-[#ffffffbb] text-center rounded-lg p-8 w-[50dvw] ml-[1rem] mr-[1rem] flex-grow h-[80dvh] mt-[14dvh]">
      <h1 className="text-4xl font-bold mb-4">Hi, {userData.firstName}</h1>
      <p className="text-lg text-gray-500 mb-6">No Link Selected</p>
      <button className="bg-black text-white py-2 px-6 rounded-[24px] mb-4 hover:scale-[1.05] transition-all" onClick={()=>{handleButtonActions('newlink')}}>Create New Link</button>
      <button className="text-blue-500 py-2 px-6 rounded-[24px] border-2 border-blue-500 hover:scale-[1.05] transition-all" onClick={()=>{handleButtonActions('listlinks')}}>My Links</button>
    </div>
  );
}

export default NoSelectScreen;
