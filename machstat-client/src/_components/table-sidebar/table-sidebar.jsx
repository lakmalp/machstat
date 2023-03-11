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
        </div>
    );
}