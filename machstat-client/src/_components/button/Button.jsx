import React from 'react'

export default function Button({ name, caption, className, onClick, disabled = false }) {
    const paddingClass = " px-2 py-1 ";
    const heightClass = " h-7 ";
    const textClass = " text-sm text-white ";
    const fontClass = " font-inter font-semibold ";
    const shapeClass = " rounded ";
    const bgClass = (disabled ? " bg-pink-200 " : " bg-pink-700 hover:bg-pink-600 ");

    return (
        <button
            name={name}
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
            disabled={disabled}
            className={`${paddingClass} ${heightClass} ${textClass} ${bgClass} ${fontClass} ${shapeClass}` + className}
        >
            {caption}
        </button>
    )
}
