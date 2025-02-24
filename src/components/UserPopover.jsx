import  { useState, useRef, useEffect } from 'react';

const UserPopover = ({children ,element,showPopover,setShowPopover,className,btnStyle}) => {
    const buttonRef = useRef(null);
    const popoverRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setShowPopover(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block">
            <button
                type="button"
                className="btn btn-secondary"
                style={btnStyle}
                onClick={() => setShowPopover(!showPopover)}
                ref={buttonRef}
            >
               {element}
            </button>
            {showPopover && (
                <div
                    className={`z-10  text-sm bg-white border border-gray-300 rounded shadow-lg ${className}`}
                    ref={popoverRef}
                >
                  {children}
                </div>
            )}
        </div>
    );
};

export default UserPopover;
