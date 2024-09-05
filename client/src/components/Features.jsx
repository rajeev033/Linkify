import linkIcon from '../assets/link-icon.png';
import lightningIcon from '../assets/lightning-icon.png';
import analyticsIcon from '../assets/analytics-icon.png';

function Features() {
  return (
    <div className="py-16" id="feat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Experience the Power of Compact Links
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <img
              src={linkIcon}
              alt="Link Icon"
              className="h-16 w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-indigo-600 mb-3 text-center">
              Simplify Complex URLs
            </h3>
            <p className="text-gray-600 text-center">
              Transform intricate URLs into sleek, shareable, and memorable short links, making content sharing a breeze.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <img
              src={lightningIcon}
              alt="Lightning Icon"
              className="h-16 w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-purple-600 mb-3 text-center">
              Lightning-Fast Redirects
            </h3>
            <p className="text-gray-600 text-center">
              Enjoy seamless and instantaneous redirection, ensuring a smooth browsing experience for your audience.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <img
              src={analyticsIcon}
              alt="Analytics Icon"
              className="h-16 w-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-pink-600 mb-3 text-center">
              Unparalleled Insights
            </h3>
            <p className="text-gray-600 text-center">
              Gain invaluable insights into your link performance with our advanced analytics suite, empowering data-driven decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;