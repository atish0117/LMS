import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"
import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [setValue])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center bg-green-900 bg-opacity-30 backdrop-blur-sm">
      <div className="w-11/12 max-w-[500px] rounded-xl bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-xl bg-green-600 p-4">
          <p className="text-xl font-semibold text-white">Add Your Review</p>
          <button 
            onClick={() => setReviewModal(false)}
            className="text-white hover:text-green-100 transition-colors"
          >
            <RxCross2 className="text-2xl" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.image}
              alt={`${user?.firstName} profile`}
              className="h-12 w-12 rounded-full object-cover border-2 border-green-200"
            />
            <div>
              <p className="font-medium text-green-800">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-green-600">Posting Publicly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="flex justify-center">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={28}
                activeColor="#3EB270" // Your brand green
                emptyIcon={<span className="text-gray-300">★</span>}
                fullIcon={<span>★</span>}
              />
            </div>

            <div>
              <label htmlFor="courseExperience" className="block text-sm font-medium text-green-700 mb-1">
                Share your experience <span className="text-green-600">*</span>
              </label>
              <textarea
                id="courseExperience"
                placeholder="What did you think about this course?"
                {...register("courseExperience", { required: true })}
                className="w-full rounded-lg border border-green-200 p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                rows={4}
              />
              {errors.courseExperience && (
                <p className="mt-1 text-sm text-green-600">Please share your experience</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="rounded-lg border border-green-600 bg-white px-5 py-2 font-medium text-green-700 hover:bg-green-50 transition-colors"
              >
                Cancel
              </button>
              <IconBtn 
                text="Submit Review" 
                type="submit"
                customClasses="bg-green-600 hover:bg-green-700 text-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}