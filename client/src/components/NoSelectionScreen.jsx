function NoSelectScreen({ handleButtonActions }) {
  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Hi, {userData.firstName}</h1>
      <p className="text-lg text-gray-600 mb-8">What would you like to do today?</p>
      <div className="space-y-4">
        <button 
          className="w-full bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
          onClick={() => handleButtonActions('newlink')}
        >
          Create New Link
        </button>
        <button 
          className="w-full bg-white text-indigo-600 py-2 px-6 rounded-md border border-indigo-600 hover:bg-indigo-50 transition duration-300"
          onClick={() => handleButtonActions('listlinks')}
        >
          View My Links
        </button>
      </div>
    </div>
  );
}

export default NoSelectScreen;
