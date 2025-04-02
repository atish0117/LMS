import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"
import { Link } from "react-router-dom"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="bg-[#e6f4ea] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">Your Cart</h1>
          <p className="text-green-600 mt-2">
            {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Cart
          </p>
        </div>

        {total > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RenderCartCourses />
            </div>
            <div className="lg:col-span-1">
              <RenderTotalAmount />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-green-700">Your cart is empty</p>
            <Link 
              to="/courses" 
              className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}