import { faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableSidebar({ className, sidebarButtons, inquireEnabled, clickHandler, pageNo, setPageNo }) {
    return (
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
                                <input className="my-1 h-10 w-10 flex justify-center items-center text-center border rounded-full focus:outline-none bg-white text-sky-600 font-inter" value={but.value} onChange={e => but.onChange(e.target.value)} />
                            }
                            {
                                (!["_split_", "_text_"].includes(but.name)) &&
                                <button
                                    key={but.name}
                                    disabled={!(inquireEnabled[but.name] ?? true)}
                                    onClick={() => clickHandler(but.name)}
                                    className={"h-10 w-10 flex justify-center items-center font-semibold text-sm rounded-full " + ((inquireEnabled[but.name] ?? false) ? but.bgEnabledClass : but.bgDisabledClass)}>
                                    <FontAwesomeIcon className={" " + ((inquireEnabled[but.name] ?? false) ? but.iconEnabledClass : but.iconDisabledClass)} icon={but.faIcon} />
                                </button>
                            }
                        </div>
                    )
                })
            }
            {/* <div className="border-t border-gray-300 my-1"></div> */}
            {/* <button
                key="first"
                disabled={false}
                onClick={() => setPageNo(1)}
                className={"h-10 w-10 flex justify-center items-center font-semibold text-sm rounded-t-full hover:text-sky-600 text-gray-500 hover:bg-gray-200"}>
                <FontAwesomeIcon className={"h-3 w-3 -rotate-90"} icon={faAnglesRight} />
            </button> */}
            {/* <button
                key="previous"
                disabled={(pageNo === 1)}
                onClick={() => setPageNo(prev => parseInt(prev) - 1)}
                className={"h-10 w-10 flex justify-center items-center font-semibold text-sm rounded-fulla hover:text-sky-600 text-gray-500 hover:bg-gray-200"}>
                <FontAwesomeIcon className={"h-3 w-3 -rotate-90"} icon={faAngleRight} />
            </button> */}
            {/* <input className="h-10 w-10 flex justify-center items-center text-center border focus:outline-none bg-white text-sky-600 font-inter" value={pageNo} readOnly /> */}
            {/* <button
                key="next"
                disabled={false}
                onClick={() => setPageNo(prev => parseInt(prev) + 1)}
                className={"h-10 w-10 flex justify-center items-center font-semibold text-sm rounded-fulla hover:text-sky-600 text-gray-500 hover:bg-gray-200"}>
                <FontAwesomeIcon className={"h-3 w-3 rotate-90"} icon={faAngleRight} />
            </button> */}
            {/* <button
                key="last"
                disabled={false}
                onClick={() => clickHandler()}
                className={"h-10 w-10 flex justify-center items-center font-semibold text-sm rounded-b-full hover:text-sky-600 text-gray-500 hover:bg-gray-200"}>
                <FontAwesomeIcon className={"h-3 w-3 rotate-90"} icon={faAnglesRight} />
            </button> */}
        </div>
    );
}