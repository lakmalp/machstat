import { faFloppyDisk, faSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function Button({ name, caption, className, onClick, disabled = false, processing = false }) {
    const paddingClass = "  ";
    const heightClass = "  ";
    const textClass = " text-sm text-white ";
    const fontClass = " font-inter font-semibold ";
    const shapeClass = "  ";
    const borderClass = " focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200 "
    const bgClass = (disabled ? " bg-pink-400 " : " bg-pink-600 hover:bg-pink-500 ");

    return (
        <button
            name={name}
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
            disabled={disabled}
            className={`flex items-center justify-between ${paddingClass} ${heightClass} ${textClass} ${bgClass} ${fontClass} ${shapeClass} ${borderClass}` + className}
        >
            {processing && <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" /> }
            {caption}
        </button>
    )
}
