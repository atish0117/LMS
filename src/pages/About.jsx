import React from "react";
import Footer from "../components/common/Footer";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import HighlightedText from "../components/core/HomePage/HighlightedText";

const About = () => {
  return (
    <div className="bg-[#e6f4ea] text-gray-800">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Welcome to <HighlightedText text="Our Journey" />
        </h1>
        <p className="mt-6 text-xl text-green-700 max-w-3xl mx-auto">
          Empowering learners worldwide with innovative online education.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 flex flex-col items-center gap-12 lg:flex-row">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-green-800">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Founded in 2023, our e-learning platform was created with a vision to make quality education accessible to everyone. We combine cutting-edge courses with expert mentorship to help learners worldwide achieve their potential.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            What started as a small team of educators and technologists has grown into a global community of learners, instructors, and industry partners.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img
            src="https://img.freepik.com/free-photo/colleagues-working-project-discussing-details_114579-2817.jpg?ga=GA1.1.1064057383.1738515531&semt=ais_hybrid"
            alt="Our Story"
            className="rounded-xl shadow-lg border-4 border-green-200 w-full object-cover"
          />
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-16">Our Mission & Vision</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl border-l-4 border-green-600 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-700">Mission</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              To democratize education by providing affordable, high-quality learning experiences that empower individuals to transform their careers and lives. We're committed to removing barriers to education through technology and innovation.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl border-l-4 border-green-500 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-700">Vision</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              To create a world where anyone, anywhere can access the education they need to unlock their potential. We envision a future where learning has no boundaries and every individual has the tools to shape their destiny.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <StatsComponent />
      </div>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20">
        {/* <ContactFormSection /> */}
      </section>
      
      <Footer />
    </div>
  );
};

export default About;