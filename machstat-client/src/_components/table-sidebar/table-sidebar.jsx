import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableSidebar({ className, sidebarButtons, inquireEnabled, clickHandler }) {
    return (
        <div className="flex">
            <div className={`flex flex-col ${className}`}>
                {
                    Array.isArray(sidebarButtons) && (sidebarButtons.length > 0) && sidebarButtons.map((but, key) => {
                        return (
                            <div key={key} className="flex flex-col items-center">
                                {
                                    (but.name === "_split_") &&
                                    <div className="border-t border-gray-300 my-1 w-full"></div>
                                }
                                {
                                    (but.name === "_text_") &&
                                    <input className="my-1 h-10 w-7 flex justify-center items-center text-center rounded-full focus:outline-none bg-white text-pink-600 font-inter text-sm font-semibold" value={but.value} onChange={e => but.onChange(e.target.value)} />
                                }
                                {
                                    (!["_split_", "_text_"].includes(but.name)) &&
                                    <button
                                        key={but.name}
                                        disabled={(typeof inquireEnabled === 'undefined') ? true : !inquireEnabled[but.name]}
                                        className={"flex justify-center items-center font-semibold text-sm rounded-full " + (((typeof inquireEnabled === 'undefined') ? false : inquireEnabled[but.name]) ? but.buttonEnabledClass : but.buttonDisabledClass)}>
                                        <FontAwesomeIcon onClick={() => {
                                            if (!((typeof inquireEnabled === 'undefined') ? true : !inquireEnabled[but.name])) {
                                                clickHandler(but.name);
                                            }
                                        }} className={" " + (((typeof inquireEnabled === 'undefined') ? false : inquireEnabled[but.name]) ? but.iconEnabledClass : but.iconDisabledClass)} icon={but.faIcon} />
                                    </button>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}