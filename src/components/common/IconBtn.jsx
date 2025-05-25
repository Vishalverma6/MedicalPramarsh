import React from 'react'

const IconBtn = ({
    text, onclick,
    children, disabled,
    outline= false,
    customClasses = "",
    type,
}) => {
  return (
    <button 
     className={`${outline ? "border border-yellow-400 bg-transparent  " : " bg-yellow-400"} cursor-pointer font-semibold text-black py-[6px] px-3 rounded-md flex gap-2 items-center`}
     disabled={disabled}
     onClick={onclick}
     type={type}
    >
        {
            children ? (
                <>
                  <span className={`${outline && "text-yellow-400"}`}>
                    {text}
                  </span>
                  {children}
                </>
            ) : (text)
        }
    </button>
  )
}

export default IconBtn
