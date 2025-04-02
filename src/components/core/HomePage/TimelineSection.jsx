import React from "react";
import { FaUserTie, FaTasks, FaExchangeAlt, FaCode } from "react-icons/fa";

const TimeLine = [
  {
    Icon: <FaUserTie className="text-green-400 text-3xl drop-shadow-[0_0_10px_#FFD700]" />, // Golden glow
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Icon: <FaTasks className="text-green-300 text-3xl shadow-green-500" />, // Bright green with shadow
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Icon: <FaExchangeAlt className="text-gradient bg-gradient-to-br from-green-500 to-green-300 text-3xl" />, // Gradient effect
    Heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    Icon: <FaCode className="text-neon-green-400 text-3xl" />, // Neon green for tech vibe
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-20 mb-20">
        <div className="flex flex-row gap-14">
          {TimeLine.map((ele, i) => (
            <div className="flex flex-col items-center" key={i}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                  {ele.Icon}
                </div>
                <div className="text-center">
                  <h2 className="font-semibold text-[18px]">{ele.Heading}</h2>
                  <p className="text-base">{ele.Description}</p>
                </div>
              </div>
              {TimeLine.length - 1 !== i && (
                <div className="h-1 w-14 border-dotted border-t border-richblack-100 bg-richblack-400/0"></div>
              )}
            </div>
          ))}
        </div>
        <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
          <div className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] bg-caribbeangreen-700 flex flex-row text-white uppercase py-5 gap-4">
            <div className="flex gap-5 items-center border-r border-caribbeangreen-300 px-7 lg:px-14">
              <h1 className="text-3xl font-bold w-[75px]">10</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                Years experiences
              </h1>
            </div>

            <div className="flex gap-5 items-center px-7 lg:px-14">
              <h1 className="text-3xl font-bold w-[75px]">250</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                types of courses
              </h1>
            </div>
          </div>
          <img
            src="https://cdn.pixabay.com/photo/2017/07/31/14/45/code-2558220_640.jpg"
            alt="timelineImage"
            className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;