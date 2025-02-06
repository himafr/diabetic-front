function WhiteButtonDelete({type,children,disabled={},btnClick,form}) {
    return (
        <button 
        onClick={btnClick&&btnClick}
{...disabled}
form={form&&form}
        className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#fa6060] h-9 rounded-md px-3 "
      type={type}
      >
        <svg
    stroke="currentColor"
    viewBox="0 0 24 24"
    fill="none"
    className="h-5 w-5 mr-2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    ></path>
  </svg>
        {children}
      </button>
    )
}

export default WhiteButtonDelete
