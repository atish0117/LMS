import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token)
      setEnrolledCourses(res)
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  }

  useEffect(() => {
    getEnrolledCourses()
  }, [])

  return (
    <div className="bg-[#e6f4ea] p-6 rounded-lg">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Enrolled Courses</h1>
      
      {!enrolledCourses ? (
        <div className="grid min-h-[200px] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-lg text-green-700 mb-4">
            You have not enrolled in any course yet.
          </p>
          <button 
            onClick={() => navigate("/courses")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Table Headings */}
          <div className="flex bg-green-100 text-green-800 font-medium">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          
          {/* Course List */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex items-center border-b border-green-100 hover:bg-green-50 transition-colors ${
                i === arr.length - 1 ? "rounded-b-lg" : ""
              }`}
              key={i}
            >
              {/* Course Info */}
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-4"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-14 w-14 rounded-lg object-cover border border-green-200"
                />
                <div className="flex max-w-xs flex-col gap-1">
                  <p className="font-semibold text-green-800">{course.courseName}</p>
                  <p className="text-sm text-green-600">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              
              {/* Duration */}
              <div className="w-1/4 px-2 py-3 text-green-700">
                {course?.totalDuration}
              </div>
              
              {/* Progress */}
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p className="text-sm text-green-700">
                  Progress: {course.progressPercentage || 0}%
                </p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                  bgColor="#3EB270" // Your green color
                  baseBgColor="#e6f4ea" // Light green background
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}