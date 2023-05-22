import { faAngleRight, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableSidebar({ className, sidebarButtons, inquireEnabled, clickHandler }) {
    return (
        <div className={`flex flex-col ${className}`}>
            {
                Array.isArray(sidebarButtons) && (sidebarButtons.length > 0) && sidebarButtons.map((but, key) => {
                    return (
                        <div key={key}>
                            {(but.name === "_split_") && <div className="border-t border-gray-300 my-1"></div>}
                            {
                                (but.name !== "_split_") &&
                                <button
                                    key={but.name}
                                    disabled={!(inquireEnabled[but.name] ?? true)}
                                    onClick={() => clickHandler(but.name)}
                                    className={"h-10 w-10 flex justify-center items-center font-semibold text-sm rounded-full " + ((inquireEnabled[but.name] ?? false) ? but.bgEnabledClass : but.bgDisabledClass)}>
                                    <FontAwesomeIcon className={"h-4 w-4 " + ((inquireEnabled[but.name] ?? false) ? but.iconEnabledClass : but.iconDisabledClass)} icon={but.faIcon} />
                                </button>
                            }
                        </div>
                    )
                })
            }
            <div className="border-t border-gray-300 my-1"></div>
            <button
                key="first"
                disabled={false}
                onClick={() => clickHandler()}
                className={"h-10 w-10 flex justify-center items-center font-semibold text-sm rounded-t-full hover:text-sky-600 text-gray-500 hover:bg-gray-200"}>
                <FontAwesomeIcon className={"h-3 w-3 -rotate-90"} icon={faAnglesRight} />
            </button>
            <button
                key="previous"
                disabled={false}
                onClick={() => clickHandler()}
                className={"h-10 w-10 flex justify-center items-center font-semibold text-sm rounded-fulla hover:text-sky-600 text-gray-500 hover:bg-gray-200"}>
                <FontAwesomeIcon className={"h-3 w-3 -rotate-90"} icon={faAngleRight} />
            </button>
            <input className="h-10 w-10 flex justify-center items-center text-center border focus:outline-none bg-white text-sky-600 font-inter" value="1" readOnly />
            <button
                key="next"
                disabled={false}
                onClick={() => clickHandler()}
                className={"h-10 w-10 flex justify-center items-center font-semibold text-sm rounded-fulla hover:text-sky-600 text-gray-500 hover:bg-gray-200"}>
                <FontAwesomeIcon className={"h-3 w-3 rotate-90"} icon={faAngleRight} />
            </button>
            <button
                key="last"
                disabled={false}
                onClick={() => clickHandler()}
                className={"h-10 w-10 flex justify-center items-center font-semibold text-sm rounded-b-full hover:text-sky-600 text-gray-500 hover:bg-gray-200"}>
                <FontAwesomeIcon className={"h-3 w-3 rotate-90"} icon={faAnglesRight} />
            </button>
        </div>
    );
}