import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";
import { FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

const sampleReviews = [
  {
    user: {
      firstName: "John",
      lastName: "Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    course: { courseName: "Web Development" },
    review: "Amazing course! It really helped me understand React better.",
    rating: 4.5
  },
  {
    user: {
      firstName: "Jane",
      lastName: "Smith",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    course: { courseName: "Data Structures" },
    review: "Clear and concise explanations. Highly recommend!",
    rating: 5.0
  },
  {
    user: {
      firstName: "Alice",
      lastName: "Johnson",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    course: { courseName: "Python Basics" },
    review: "Excellent content and engaging exercises.",
    rating: 4.8
  }
];

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        if (data?.success) {
          setReviews(data?.data);
        } else {
          setReviews(sampleReviews);
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews(sampleReviews);
      }
    })();
  }, []);

  return (
    <div className="text-green-900 bg-green-100 py-10 px-4">
      <div className="my-10 h-[250px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-4 bg-green-200 p-5 rounded-lg shadow-md border border-green-400">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      review?.user?.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="User Avatar"
                    className="h-12 w-12 rounded-full object-cover border-2 border-green-400"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-green-700">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <h2 className="text-sm text-green-500">{review?.course?.courseName}</h2>
                  </div>
                </div>
                <p className="font-medium text-green-800">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                    : review?.review}
                </p>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-yellow-400">
                    {review.rating.toFixed(1)}
                  </h3>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#FFD700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;