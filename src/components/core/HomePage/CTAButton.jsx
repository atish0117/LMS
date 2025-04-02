import React from 'react'
import {Link} from "react-router-dom"

const CTAButton = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
        ${active ? "bg-green-500 text-white" : "bg-green-200 text-green-700"}
        hover:scale-95 transition-all duration-200 border border-green-600
        `}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton