import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../../../services/operations/SettingsAPI";
import IconBtn from "../../../common/IconBtn";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitPasswordForm = async (data) => {
    try {
      await changePassword(token, data);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)} className="bg-green-100  p-10 flex flex-col gap-y-6">
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-green-600 bg-green-200 p-8 px-12 shadow-md">
          <h2 className="text-lg font-semibold text-green-900">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="text-green-900 font-medium">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="border border-green-500 rounded-md p-2 bg-green-50"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#2F855A" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#2F855A" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="text-sm text-red-500">Please enter your Current Password.</span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="text-green-900 font-medium">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="border border-green-500 rounded-md p-2 bg-green-50"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#2F855A" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#2F855A" />
                )}
              </span>
              {errors.newPassword && (
                <span className="text-sm text-red-500">Please enter your New Password.</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate("/dashboard/my-profile")}
            className="cursor-pointer rounded-md bg-green-600 text-white py-2 px-5 font-semibold hover:bg-green-700"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" className="bg-green-600 hover:bg-green-700" />
        </div>
      </form>
    </>
  );
}
