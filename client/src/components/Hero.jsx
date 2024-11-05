import ShortLinkBox from "./ShortLinkBox";
import Features from "./Features";

function Hero() {
    return (
        <div className="bg-gradient-to-br  min-h-screen pt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                        Make Your Links
                        <span className="block mt-2">
                            <span className="text-indigo-600">Shorter</span>,{" "}
                            <span className="text-purple-600">Smarter</span>,{" "}
                            <span className="text-pink-600">Better</span>.
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Transform your long URLs into powerful, trackable short links. Boost your online presence with our cutting-edge link management platform.
                    </p>
                </div>

                <ShortLinkBox />

                <Features />
            </div>
        </div>
    );
}

export default Hero;