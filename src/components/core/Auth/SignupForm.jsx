import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authApi"
import { setSignupData } from "../../../Slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../../common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div className="bg-green-100 p-6 rounded-lg shadow-md">
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="mb-1 text-sm text-green-700">First Name <sup className="text-green-600">*</sup></p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded bg-green-200 p-3 text-green-900 border border-green-400"
            />
          </label>
          <label className="w-full">
            <p className="mb-1 text-sm text-green-700">Last Name <sup className="text-green-600">*</sup></p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded bg-green-200 p-3 text-green-900 border border-green-400"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-sm text-green-700">Email Address <sup className="text-green-600">*</sup></p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded bg-green-200 p-3 text-green-900 border border-green-400"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative w-full">
            <p className="mb-1 text-sm text-green-700">Create Password <sup className="text-green-600">*</sup></p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded bg-green-200 p-3 pr-10 text-green-900 border border-green-400"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#006400" /> : <AiOutlineEye fontSize={24} fill="#006400" />}
            </span>
          </label>
          <label className="relative w-full">
            <p className="mb-1 text-sm text-green-700">Confirm Password <sup className="text-green-600">*</sup></p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full rounded bg-green-200 p-3 pr-10 text-green-900 border border-green-400"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#006400" /> : <AiOutlineEye fontSize={24} fill="#006400" />}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded bg-green-600 py-2 px-4 font-medium text-white hover:bg-green-700"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm