export default function Tab({ tabData, field, setField }) {
  return (
    <div
      className="flex bg-green-900 p-1 gap-x-2 my-6 rounded-lg border border-green-500 max-w-max"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "bg-green-500 text-green-900 font-bold"
              : "bg-transparent text-green-300"
          } py-2 px-5 rounded-md border border-green-500 hover:bg-green-700 hover:text-green-100 transition-all duration-200`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
