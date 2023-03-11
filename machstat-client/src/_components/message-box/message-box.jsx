import { faCheck, faExclamation, faExclamationTriangle, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export const MessageBoxConstants = {
    Buttons: {
        MB_Ok: 'mb_ok',
        MB_YesNo: 'mb_yesno',
        MB_Cancel: 'mb_cancel',
        MB_Custom: 'mb_custom'
    },
    Type: {
        Primary: 'primary',
        Danger: 'danger',
        Success: 'success',
        Warning: 'warning'
    }
};

export function MessageBox({ type = MessageBoxConstants.Type.Primary, title = 'No Title', message = 'No Message', button = MessageBoxConstants.Buttons.MB_Ok }) {
    const iconColorVariants = {
        [MessageBoxConstants.Type.Danger]: "text-xl text-red-600",
        [MessageBoxConstants.Type.Success]: "text-xl text-green-600",
        [MessageBoxConstants.Type.Warning]: "text-xl text-yellow-600",
        [MessageBoxConstants.Type.Primary]: "text-xl text-blue-600"
    }
    
    const iconBgColorVariants = {
        [MessageBoxConstants.Type.Danger]: "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10",
        [MessageBoxConstants.Type.Success]: "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10",
        [MessageBoxConstants.Type.Warning]: "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-200 sm:mx-0 sm:h-10 sm:w-10",
        [MessageBoxConstants.Type.Primary]: "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
    }

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className={iconBgColorVariants[type]}>
                                    {(type === MessageBoxConstants.Type.Danger) && <FontAwesomeIcon icon={faExclamationTriangle} className={iconColorVariants[type]} />}
                                    {(type === MessageBoxConstants.Type.Success) && <FontAwesomeIcon icon={faCheck} className={iconColorVariants[type]} />}
                                    {(type === MessageBoxConstants.Type.Warning) && <FontAwesomeIcon icon={faExclamation} className={iconColorVariants[type]} />}
                                    {(type === MessageBoxConstants.Type.Primary) && <FontAwesomeIcon icon={faQuestion} className={iconColorVariants[type]} />}
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">{message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}