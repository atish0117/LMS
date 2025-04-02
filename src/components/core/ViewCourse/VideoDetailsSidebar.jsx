import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId])

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-green-200 bg-white shadow-lg">
      {/* Header */}
      <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-green-200 py-5">
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 p-1 text-green-700 hover:bg-green-200 transition-colors"
            title="back"
          >
            <IoIosArrowBack size={20} />
          </button>
          <IconBtn
            text="Add Review"
            customClasses="ml-auto bg-green-600 hover:bg-green-700 text-white"
            onclick={() => setReviewModal(true)}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold text-green-800">{courseEntireData?.courseName}</p>
          <p className="text-sm font-medium text-green-600">
            Completed: {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* Course Sections */}
      <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
        {courseSectionData.map((course, index) => (
          <div
            className="mt-2 cursor-pointer text-sm"
            onClick={() => setActiveStatus(course?._id)}
            key={index}
          >
            {/* Section Header */}
            <div className="flex justify-between items-center bg-green-50 px-5 py-4 hover:bg-green-100 transition-colors">
              <div className="w-[70%] font-semibold text-green-800">
                {course?.sectionName}
              </div>
              <div className="flex items-center gap-3">
                <BsChevronDown 
                  className={`text-green-600 transition-transform duration-300 ${
                    activeStatus === course?._id ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Sub Sections */}
            {activeStatus === course?._id && (
              <div className="transition-all duration-300">
                {course.subSection.map((topic, i) => (
                  <div
                    className={`flex gap-3 items-center px-5 py-3 ${
                      videoBarActive === topic._id
                        ? "bg-green-100 font-medium text-green-800"
                        : "hover:bg-green-50 text-green-700"
                    } transition-colors`}
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      )
                      setVideoBarActive(topic._id)
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                      className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="truncate">{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}