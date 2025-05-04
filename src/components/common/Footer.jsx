import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-green-800 to-green-900 text-green-100">
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-between w-11/12 max-w-maxContent mx-auto py-14">
        {/* Section 1: Company Info */}
        <div className="lg:w-1/2 flex flex-wrap flex-row justify-between lg:border-r border-green-700 pl-3 lg:pr-5 gap-8">
          <div className="w-full lg:w-[30%] flex flex-col gap-4 mb-7">
            <h1 className="text-green-300 text-2xl flex items-center gap-3">
              <FaBook className="text-3xl" /> Study Point
            </h1>
            <p className="text-sm text-green-200">
              Empowering learners worldwide with accessible and engaging education.
            </p>
            <div className="flex gap-4 text-lg text-green-200">
              <a href="https://facebook.com" className="hover:text-green-50 transition-all duration-300">
                <FaFacebook />
              </a>
              <a href="https://google.com" className="hover:text-green-50 transition-all duration-300">
                <FaGoogle />
              </a>
              <a href="https://twitter.com" className="hover:text-green-50 transition-all duration-300">
                <FaTwitter />
              </a>
              <a href="https://youtube.com" className="hover:text-green-50 transition-all duration-300">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Section 2: Resources */}
          <div className="w-full lg:w-[48%] mb-7">
            <h1 className="font-semibold text-lg text-green-300 mb-3">Resources</h1>
            <div className="flex flex-col gap-2">
              {Resources.map((ele, index) => (
                <Link
                  key={index}
                  to={ele.split(" ").join("-").toLowerCase()}
                  className="text-sm text-green-200 hover:text-green-50 transition-all duration-300"
                >
                  {ele}
                </Link>
              ))}
            </div>
          </div>

          {/* Section 3: Plans */}
          <div className="w-full lg:w-[48%] mb-7">
            <h1 className="font-semibold text-lg text-green-300 mb-3">Plans</h1>
            <div className="flex flex-col gap-2">
              {Plans.map((ele, index) => (
                <Link
                  key={index}
                  to={ele.split(" ").join("-").toLowerCase()}
                  className="text-sm text-green-200 hover:text-green-50 transition-all duration-300"
                >
                  {ele}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: Community */}
        <div className="lg:w-1/2 flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-8">
          <div className="w-full lg:w-[48%] mb-7">
            <h1 className="font-semibold text-lg text-green-300 mb-3">Community</h1>
            <div className="flex flex-col gap-2">
              {Community.map((ele, index) => (
                <Link
                  key={index}
                  to={ele.split(" ").join("-").toLowerCase()}
                  className="text-sm text-green-200 hover:text-green-50 transition-all duration-300"
                >
                  {ele}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-green-700 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-maxContent mx-auto text-sm">
          <div className="flex flex-row gap-4 mb-4 lg:mb-0">
            {BottomFooter.map((ele, i) => (
              <div
                key={i}
                className={`px-3 ${
                  BottomFooter.length - 1 === i ? "" : "border-r border-green-700"
                }`}
              >
                <Link
                  to={ele.split(" ").join("-").toLowerCase()}
                  className="text-green-200 hover:text-green-50 transition-all duration-300"
                >
                  {ele}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-green-200 text-center">
            Made with ❤️ by ATISH © 2025 Study Point
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;