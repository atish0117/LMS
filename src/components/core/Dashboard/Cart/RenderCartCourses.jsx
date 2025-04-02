import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "../../../../Slices/cartSlice"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-1 flex-col">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-green-200 pb-6"
          } ${indx !== 0 && "mt-6"}`}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover border border-green-100"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-semibold text-green-800">
                {course?.courseName}
              </p>
              <p className="text-sm text-green-600">
                {course?.category?.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-medium text-green-700">
                  {course?.ratingAndReviews?.length || 0}
                </span>
                <ReactStars
                  count={5}
                  value={course?.ratingAndReviews?.length}
                  size={20}
                  edit={false}
                  activeColor="#3EB270"  // Your green color
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-sm text-green-500">
                  ({course?.ratingAndReviews?.length} Ratings)
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-green-300 bg-white py-2 px-3 text-green-700 hover:bg-green-50 transition-colors"
            >
              <RiDeleteBin6Line className="text-green-600" />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-2xl font-bold text-green-800">
              ₹{course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}