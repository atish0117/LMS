import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { courseId } = useParams()
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [isActive, setIsActive] = useState(Array(0))
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    }
    fetchDetails()
  }, [courseId])

  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])

  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!response.success) {
    return <Error />
  }

  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data?.courseDetails

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="bg-[#e6f4ea]">
      {/* Hero Section */}
      <div className="bg-green-700">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center space-x-2 text-sm text-green-100">
                <span>Home</span>
                <span>/</span>
                <span>Courses</span>
                <span>/</span>
                <span className="text-green-50">{courseName}</span>
              </div>
              
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                {courseName}
              </h1>
              
              <p className="mt-4 text-lg text-green-100">{courseDescription}</p>
              
              <div className="mt-6 flex flex-wrap items-center gap-4 text-white">
                <div className="flex items-center">
                  <span className="mr-1 font-medium text-green-200">{avgReviewCount}</span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                  <span className="ml-2 text-green-100">({ratingAndReviews.length} reviews)</span>
                </div>
                <span className="text-green-100">{studentsEnrolled.length} students enrolled</span>
              </div>
              
              <div className="mt-4 text-green-100">
                <p>Created by {`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4 text-green-100">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            
            {/* Mobile Course Card */}
            <div className="lg:hidden">
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <img
                  src={thumbnail}
                  alt={courseName}
                  className="mb-4 h-40 w-full rounded-lg object-cover"
                />
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-800">₹{price}</span>
                  <button 
                    onClick={handleBuyCourse}
                    className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            
            {/* Desktop Course Card */}
            <div className="hidden lg:block">
              <CourseDetailsCard
                course={response?.data?.courseDetails}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* What You'll Learn Section */}
            <div className="rounded-xl bg-white p-8 shadow-md">
              <h2 className="mb-6 text-3xl font-bold text-green-800">What you'll learn</h2>
              <div className="prose prose-green max-w-none">
                <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
              </div>
            </div>

            {/* Course Content Section */}
            <div className="mt-12">
              <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
                <h2 className="text-3xl font-bold text-green-800">Course Content</h2>
                <div className="mt-4 flex items-center space-x-4 sm:mt-0">
                  <span className="text-green-700">{courseContent.length} sections</span>
                  <span className="text-green-700">{totalNoOfLectures} lectures</span>
                  <span className="text-green-700">{response.data?.totalDuration} total length</span>
                  <button 
                    onClick={() => setIsActive([])} 
                    className="text-green-600 hover:text-green-800"
                  >
                    Collapse all
                  </button>
                </div>
              </div>

              {/* Accordion */}
              <div className="space-y-4">
                {courseContent?.map((course, index) => (
                  <CourseAccordionBar
                    course={course}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))}
              </div>
            </div>

            {/* Instructor Section */}
            <div className="mt-12 rounded-xl bg-white p-8 shadow-md">
              <h2 className="mb-6 text-3xl font-bold text-green-800">Instructor</h2>
              <div className="flex items-start gap-6">
                <img
                  src={instructor.image || `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`}
                  alt={`${instructor.firstName} ${instructor.lastName}`}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-green-800">
                    {`${instructor.firstName} ${instructor.lastName}`}
                  </h3>
                  <p className="mt-2 text-green-700">
                    {instructor?.additionalDetails?.about}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CourseDetails