import  { useState, useRef, useEffect } from 'react';

const Popover = ({children ,element}) => {
    const [showPopover, setShowPopover] = useState(false);
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
                onClick={() => setShowPopover(!showPopover)}
                ref={buttonRef}
            >
               {element}
            </button>
            {showPopover && (
                <div
                    className="absolute z-10 w-64 p-4 mt-2 text-sm bg-white border border-gray-300 rounded shadow-lg"
                    style={{ bottom: '-120px', left: '-100%', transform: 'translateX(-50%)' }}
                    ref={popoverRef}
                >
                  {children}
                </div>
            )}
        </div>
    );
};

export default Popover;
