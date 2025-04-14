import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id =
        res?.data?.data?.find((ct) =>
          ct.name.split(" ").join("-").toLowerCase() === catalogName
        )?._id || null;
      setCategoryId(category_id);
    }
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
      }
      catch (error) {
        console.log(error)
      }
    }
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <div className="bg-[#e6f4ea]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 px-4 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex pb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="text-sm font-medium text-green-100 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <a href="/catalog" className="ml-1 text-sm font-medium text-green-100 hover:text-white md:ml-2">
                    Catalog
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-green-50 md:ml-2">
                    {catalogPageData?.data?.selectedCategory?.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-green-100">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 - Popular/New Courses */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-800">Courses to get you started</h2>
          <div className="my-6 flex border-b border-b-green-200">
            <button
              className={`px-4 py-2 font-medium ${active === 1
                ? "border-b-2 border-b-green-600 text-green-600"
                : "text-green-700 hover:text-green-600"
                }`}
              onClick={() => setActive(1)}
            >
              Most Popular
            </button>
            <button
              className={`px-4 py-2 font-medium ${active === 2
                ? "border-b-2 border-b-green-600 text-green-600"
                : "text-green-700 hover:text-green-600"
                }`}
              onClick={() => setActive(2)}
            >
              New
            </button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {catalogPageData?.data?.selectedCategory?.course?.map((course, i) => (
              <Course_Card 
                course={course} 
                key={i} 
                Height={"h-[400px]"} 
                cardStyle="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden"
                titleStyle="text-lg font-bold text-green-800 line-clamp-2"
                instructorStyle="text-sm font-medium text-green-600"
              />
            ))}
          </div>
        </div>

        {/* Section 2 - Top Courses */}
        {catalogPageData?.data?.differentCategory && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-green-800">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {catalogPageData?.data?.differentCategory?.course?.map((course, i) => (
                <Course_Card 
                  course={course} 
                  key={i} 
                  Height={"h-[400px]"} 
                  cardStyle="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden"
                  titleStyle="text-lg font-bold text-green-800 line-clamp-2"
                  instructorStyle="text-sm font-medium text-green-600"
                />
              ))}
            </div>
          </div>
        )}

        {/* Section 3 - Frequently Bought */}
        {catalogPageData?.data?.mostSellingCourses && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-green-800">Frequently Bought</h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              {catalogPageData?.data?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, i) => (
                  <Course_Card 
                    course={course} 
                    key={i} 
                    Height={"h-[400px]"} 
                    cardStyle="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden"
                    titleStyle="text-lg font-bold text-green-800 line-clamp-2"
                    instructorStyle="text-sm font-medium text-green-600"
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Catalog