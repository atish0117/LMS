import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import CTAButton from "../components/core/HomePage/CTAButton";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import HighlightedText from "../components/core/HomePage/HighlightedText";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimelineSection from "../components/core/HomePage/TimelineSection";

function Home() {
  return (
    <div className="bg-green-100 text-black">
      {/* Section 1 */}
      <div className="relative mx-auto w-11/12 max-w-maxContent flex flex-col lg:flex-row items-center justify-between gap-12 py-16">
        {/* Left Side: Text Content */}
        <div className="flex flex-col items-start lg:w-1/2 gap-8">
          {/* Heading */}
          <div className="text-6xl font-bold text-left">
            Empower Your Future with
            <HighlightedText text={" Coding Skills"} className="text-green-500" />
          </div>

          {/* Sub Heading */}
          <div className="text-xl font-medium text-gray-800 text-left">
            Learn at your own pace from anywhere in the world with hands-on projects, quizzes, and personalized feedback from instructors.
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex gap-5">
            <CTAButton
              active={true}
              linkto="/signup"
              className="bg-green-500 text-white hover:bg-green-600 transition-all duration-300"
            >
              <span>Get started</span>
            </CTAButton>
            <CTAButton
              active={false}
              linkto="/login"
              className="bg-green-400 text-white hover:bg-green-500 transition-all duration-300"
            >
              Book a Demo
            </CTAButton>
          </div>

          {/* Instructor Button */}
          <Link to="/signup">
            <div className="group w-fit rounded-full bg-green-600 p-2 shadow-lg transition-all duration-300 hover:bg-green-500 hover:scale-105">
              <div className="flex items-center gap-3 px-8 py-2">
                <p className="text-lg font-medium text-white">Become an Instructor</p>
                <FaArrowRight className="text-green-300 transition-transform duration-300 group-hover:translate-x-2" />
              </div>
            </div>
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className="lg:w-1/2 rounded-lg shadow-[0px_5px_30px] shadow-green-400/50 overflow-hidden transform transition-all duration-300 hover:scale-105">
          <img
            src="https://cdn.pixabay.com/photo/2017/03/04/12/15/programming-2115930_640.jpg"
            alt="Coding"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-green-200 text-black py-20">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-12 py-16">
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center gap-12 bg-green-300 text-black py-20 rounded-lg shadow-lg">
        <InstructorSection />
        {/* <h1 className="text-center text-5xl font-bold">Reviews from other learners</h1> */}
        {/* <ReviewSlider /> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
