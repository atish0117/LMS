import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-green-900 bg-opacity-30 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-xl border border-green-300 bg-white p-6 shadow-lg">
        <p className="text-2xl font-bold text-green-800">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 text-green-700">
          {modalData?.text2}
        </p>
        <div className="flex items-center justify-end gap-x-4">
          <button
            className="rounded-lg border border-green-600 bg-white px-5 py-2 font-medium text-green-700 hover:bg-green-50 transition-colors"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            customClasses="bg-green-600 hover:bg-green-700 text-white"
          />
        </div>
      </div>
    </div>
  )
}