import { diagnoses } from "fontawesome"

function WhiteButton({type,children,disabled={},btnClick,form}) {
    return (
        <button 
        onClick={btnClick&&btnClick}
{...disabled}
form={form&&form}
        className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60A5FA] h-9 rounded-md px-3 "
      type={type}
      >
        <svg
          className="lucide lucide-newspaper text-blue-400 dark:text-blue-600"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          stroke="#60A5FA"
          fill="none"
          viewBox="0 0 24 24"
          height="22"
          width="22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"
          ></path>
          <path d="M18 14h-8"></path>
          <path d="M15 18h-5"></path>
          <path d="M10 6h8v4h-8V6Z"></path>
        </svg>
        {children}
      </button>
    )
}

export default WhiteButton
