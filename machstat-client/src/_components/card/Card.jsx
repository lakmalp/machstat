import React from 'react'

const Card = ({ className, children }) => {
    return (
        <>
            <div className={className}>
                {children}
            </div>
        </>
    )
}

const Header = ({ children }) => {
    return <h1 className="text-lg text-center font-semibold font-inter text-gray-600 pb-6">{children}</h1>;
};

const Body = ({ children }) => {
    return <div className="card-body">{children}</div>;
};

Card.Header = Header;
Card.Body = Body;

export default Card;