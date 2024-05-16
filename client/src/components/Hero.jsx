import ShortLinkBox from "./ShortLinkBox";
import Features from "./Features";
function Hero()
{
    return (
    <>
        <div className="Hero h-[100dvh] mt-[14dvh] flex justify-evenly items-center flex-row flex-wrap max-[424px]:justify-center" id="hero-st">
        <div className="h-[100%] w-[100%] rounded-[300px] absolute z-[-1] blur-[240px] bg-gradient-to-r from-pink-100 via-pink-200 to-purple-400"></div>

                <div className="HeroText h-[40dvh] px-2.5 flex flex-col items-center justify-center max-[424px]:mt-[1rem] max-[424px]:text-[2.2rem] max-[424px]:mx-[1rem]">
                    <p className="text-center">Make Your Links</p>
                    <p className="text-center"><span className="bg-gradient-to-r from-purple-800 from-20% to-cyan-600 text-transparent bg-clip-text">Shorter, </span>
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text">Smarter, </span>
                    <span className="bg-gradient-to-r from-pink-600 from-50% via-violet-700 to-blue-600 text-transparent bg-clip-text">Better.</span></p>
                </div>
                <ShortLinkBox/>
                
                <Features/>
                <div className="h-[100%] w-[100%] rounded-[300px] absolute top-[100dvh] z-[-1] blur-[240px] bg-gradient-to-r from-pink-100 via-pink-200 to-purple-400"></div>
        </div>
        


    </>
    )
}
export default Hero;