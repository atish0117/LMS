import React from 'react';
import HighlightText from './HighlightedText';
import CTAButton from "../../../components/core/HomePage/CTAButton";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  return (
    <div className="bg-gradient-to-b from-green-500 to-green-300 py-16 px-4 lg:px-20 rounded-xl shadow-lg flex flex-col lg:flex-row gap-10">
      {/* Left Side: Text Content */}
      <div className="lg:w-1/2">
        <div className="text-5xl font-bold text-white mb-10">
          Your ultimate tool for
          <HighlightText text={"mastering languages effortlessly"} />
          <div className="text-white/90 font-medium leading-7 text-lg mt-4">
            With Spin, learning multiple languages becomes simple — enjoy 20+
            languages with realistic voice-overs, progress tracking, custom
            schedules, and more.
          </div>
        </div>
        <div className="w-fit">
          <CTAButton active={true} linkto={"/signup"}>
            <div className="text-white text-lg font-bold">Start Learning Now</div>
          </CTAButton>
        </div>
      </div>

      {/* Right Side: Images */}
      <div className="lg:w-1/2 relative flex items-center justify-center min-h-[500px]">
        <img
          src={Know_your_progress}
          alt="Know your progress"
          className="absolute top-0 left-0 w-60 lg:w-[400px] rounded-xl shadow-md rotate-[-10deg] hover:rotate-0 transition-transform duration-300"
        />
        <img
          src={Compare_with_others}
          alt="Compare with others"
          className="absolute bottom-0 right-0 w-60 lg:w-[380px] rounded-xl shadow-md rotate-[15deg] hover:rotate-0 transition-transform duration-300"
        />
        <img
          src={Plan_your_lessons}
          alt="Plan your lessons"
          className="absolute top-1/2 left-1/2 transform -translate-x-50 translate-y-1/5 w-60 lg:w-[350px] rounded-xl shadow-md rotate-[2deg] hover:rotate-0 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default LearningLanguageSection;
