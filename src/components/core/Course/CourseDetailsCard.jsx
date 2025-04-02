import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../Slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg">
      {/* Course Image */}
      <img
        src={ThumbnailImage}
        alt={course?.courseName}
        className="h-48 w-full rounded-lg object-cover"
      />

      <div className="space-y-4">
        <div className="text-3xl font-bold text-green-800">
          ₹{CurrentPrice}
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            className={`w-full rounded-lg py-3 font-medium text-white transition-all ${
              user && course?.studentsEnrolled.includes(user?._id)
                ? "bg-green-600 hover:bg-green-700"
                : "bg-green-700 hover:bg-green-800"
            }`}
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>
          
          {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
            <button 
              onClick={handleAddToCart} 
              className="w-full rounded-lg border border-green-600 bg-white py-3 font-medium text-green-700 hover:bg-green-50"
            >
              Add to Cart
            </button>
          )}
        </div>

        <p className="text-center text-sm text-green-600">
          30-Day Money-Back Guarantee
        </p>

        <div className="space-y-3">
          <p className="text-xl font-semibold text-green-800">
            This Course Includes:
          </p>
          <div className="space-y-2 text-sm text-green-700">
            {course?.instructions?.map((item, i) => (
              <p className="flex items-start gap-2" key={i}>
                <BsFillCaretRightFill className="mt-1 text-green-600" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            className="mx-auto flex items-center gap-2 text-green-600 hover:text-green-800"
            onClick={handleShare}
          >
            <FaShareSquare size={15} /> Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard