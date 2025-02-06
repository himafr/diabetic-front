import { diagnoses } from "fontawesome"

function WhiteButtonUpdate({type,children,disabled={},btnClick,form}) {
    return (
        <button 
        onClick={btnClick&&btnClick}
{...disabled}
form={form&&form}
        className="cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#60ccfa] h-9 rounded-md px-3 "
      type={type}
      >


      <svg viewBox="0 0 24 24" fill="none"  className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg"  stroke="currentColor">
<path d="M13 3H7C5.89543 3 5 3.89543 5 5V10M13 3L19 9M13 3V8C13 8.55228 13.4477 9 14 9H19M19 9V19C19 20.1046 18.1046 21 17 21H10C7.79086 21 6 19.2091 6 17V17C6 14.7909 7.79086 13 10 13H13M13 13L10 10M13 13L10 16"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      
        {children}
      </button>
    )
}

export default WhiteButtonUpdate
