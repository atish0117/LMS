import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const Course_Card = ({ course, Height, cardStyle = "", titleStyle = "", instructorStyle = "" }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course])

    return (
        <Link to={`/courses/${course._id}`} className="group">
            <div className={`${cardStyle} h-full`}>
                <div className="overflow-hidden rounded-t-xl">
                    <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className={`${Height} w-full object-cover transition-transform duration-300 group-hover:scale-105`}
                    />
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <h3 className={`${titleStyle || "text-lg font-bold text-green-800 line-clamp-2"}`}>
                        {course?.courseName}
                    </h3>
                    <p className={`${instructorStyle || "text-sm text-green-600"}`}>
                        {course?.instructor?.firstName} {course?.instructor?.lastName}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-green-700">{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} Star_Size={16} />
                        <span className="text-sm text-green-500">
                            ({course?.ratingAndReviews?.length} {course?.ratingAndReviews?.length === 1 ? 'Rating' : 'Ratings'})
                        </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-bold text-green-800">₹{course?.price}</span>
                        {course?.studentsEnrolled?.length > 0 && (
                            <span className="text-sm text-green-600">
                                {course.studentsEnrolled.length} students
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Course_Card