import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
import { FaBook } from "react-icons/fa"

import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

export function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div className={`flex h-20 items-center justify-center border-b-[1px] border-green-500 ${
      location.pathname !== "/" ? "bg-green-100" : "bg-green-200"
    } transition-all duration-200`}>
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-green-700 text-2xl flex gap-3"><FaBook/>Study Point</h1>
        </Link>
        
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-green-800">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="group relative">
                    <div className={`flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName") 
                        ? "text-green-600" 
                        : "text-green-800"
                    }`}>
                      <p>{link.title}</p>
                      <BsChevronDown className="text-sm" />
                    </div>
                    
                    {/* Dropdown Content */}
                    <div className="absolute left-0 top-full z-50 mt-2 w-56 origin-top-left scale-95 transform rounded-lg bg-white p-2 shadow-lg ring-1 ring-green-200 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      <div className="py-1">
                        {loading ? (
                          <p className="px-4 py-2 text-sm text-green-700">Loading...</p>
                        ) : subLinks ? (
                          subLinks
                            ?.filter((subLink) => subLink?.course?.length > 0)
                            ?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                className="block rounded-md px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                                key={i}
                              >
                                {subLink.name}
                              </Link>
                            ))
                        ) : (
                          <p className="px-4 py-2 text-sm text-green-700">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${
                      matchRoute(link?.path) 
                        ? "text-green-600" 
                        : "text-green-800"
                    }`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-green-700" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-green-600 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-lg border border-green-600 bg-green-200 px-4 py-2 text-green-700 hover:bg-green-300">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-lg border border-green-600 bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#3EB270" />
        </button>
      </div>
    </div>
  )
}