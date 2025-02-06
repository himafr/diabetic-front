import React from 'react';

const Badge = ({ children ,classColor="text-white",classBg}) => {
    return (
        <span className={` inline-block px-2 py-0.1 text-xs font-semibold ${classColor} ${classBg} rounded tracking-wider `}>
            {children}
        </span>
    );
};

export default Badge;