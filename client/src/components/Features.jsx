
import linkIcon from '../assets/link-icon.png';
import lightningIcon from '../assets/lightning-icon.png';
import analyticsIcon from '../assets/analytics-icon.png';

function Features() {
  return (
    <div className="py-16" id="feat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Experience the Power of Compact Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#ffffff83] rounded-lg shadow-md p-6">
            <img
              src={linkIcon}
              alt="Link Icon"
              className="h-16 w-16 mx-auto mb-4"
            />
             <span className="text-xl block  text-center font-bold bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text mb-2">Simplify Complex URLs
            </span>
            <p className="text-[#696969] text-center">
              Say goodbye to lengthy, convoluted links that clutter your
              communication. Our platform effortlessly transforms even the most
              intricate URLs into sleek, shareable, and memorable short links,
              making sharing and accessing content a breeze.
            </p>
          </div>
          <div className="bg-[#ffffff83] rounded-lg shadow-md p-6">
            <img
              src={lightningIcon}
              alt="Lightning Icon"
              className="h-16 w-16 mx-auto mb-4"
            />
            <span className="text-xl block  text-center font-bold bg-gradient-to-r from-purple-800 from-20% to-cyan-600 text-transparent bg-clip-text mb-2">Lightning-Fast Redirects
            </span>
              
            <p className="text-[#696969] text-center">
              Enjoy seamless and instantaneous redirection to your desired
              destinations. Our cutting-edge technology ensures a smooth
              browsing experience for your audience, eliminating unnecessary
              delays and frustrations.
            </p>
          </div>
          <div className="bg-[#ffffff83] rounded-lg shadow-md p-6">
            <img
              src={analyticsIcon}
              alt="Analytics Icon"
              className="h-16 w-16 mx-auto mb-4"
            />
            <span className="text-xl block  text-center font-bold bg-gradient-to-r from-pink-600 from-50% via-violet-700 to-blue-600 text-transparent bg-clip-text mb-2">
            Unparalleled Insights at Your Fingertips
            </span>
           
            <p className="text-[#696969] text-center">
              Gain invaluable insights into your link performance with our
              advanced analytics suite. Monitor detailed metrics such as clicks,
              browser types, devices, and more, empowering you to make
              data-driven decisions and optimize your strategy for maximum
              impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;