import { faSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export default function Button({ name, caption, className, onClick, disabled = false, processing = false }) {
    const paddingClass = "  ";
    const heightClass = "  ";
    const textClass = " text-sm text-white ";
    const fontClass = " font-inter font-semibold ";
    const shapeClass = " rounded ";
    const bgClass = (disabled ? " bg-pink-400 " : " bg-pink-700 hover:bg-pink-600 ");

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
            {!processing && caption}
            {processing && <FontAwesomeIcon icon={faSlash} className="animate-spin" /> }
        </button>
    )
}
