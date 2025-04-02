import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)

  // Accordion state
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])
  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden rounded-lg border border-green-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div>
        <div
          className={`flex cursor-pointer items-center justify-between px-6 py-4 transition-all duration-200 ${active ? "bg-green-50" : "bg-white"}`}
          onClick={() => {
            handleActive(course._id)
          }}
        >
          <div className="flex items-center gap-3">
            <AiOutlineDown 
              className={`text-green-600 transition-transform duration-200 ${active ? "rotate-180" : "rotate-0"}`}
            />
            <p className="font-medium text-green-800">{course?.sectionName}</p>
          </div>
          <div className="space-x-4">
            <span className="text-green-600">
              {`${course.subSection.length || 0} lecture(s)`}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`overflow-hidden transition-all duration-300 ease-in-out`}
        style={{
          height: sectionHeight,
        }}
      >
        <div className="flex flex-col gap-2 bg-green-50 px-6 py-4">
          {course?.subSection?.map((subSec, i) => {
            return <CourseSubSectionAccordion subSec={subSec} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}