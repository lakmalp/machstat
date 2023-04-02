import { faCheck, faExclamation, faExclamationTriangle, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { messageBoxResolveFunc, useMessageBoxService } from "../../_contexts/MessageBoxContext";

export function MessageBox() {
    const { MessageBox } = useMessageBoxService();

    const iconColorVariants = {
        [MessageBox.Constants.Type.Danger]: " text-red-600",
        [MessageBox.Constants.Type.Success]: "text-green-600",
        [MessageBox.Constants.Type.Warning]: "text-yellow-600",
        [MessageBox.Constants.Type.Information]: "text-blue-600"
    }

    const iconBgColorVariants = {
        [MessageBox.Constants.Type.Danger]: "bg-red-100",
        [MessageBox.Constants.Type.Success]: "bg-green-100",
        [MessageBox.Constants.Type.Warning]: "bg-yellow-200",
        [MessageBox.Constants.Type.Information]: "bg-blue-100"
    }

    const buttonBgColorVariants = {
        [MessageBox.Constants.Type.Danger]: "bg-red-600 hover:bg-red-500",
        [MessageBox.Constants.Type.Success]: "bg-green-600 hover:bg-green-500",
        [MessageBox.Constants.Type.Warning]: "bg-yellow-600 hover:bg-yellow-500",
        [MessageBox.Constants.Type.Information]: "bg-blue-600 hover:bg-blue-500"
    }

    return (
        <>
            <Transition appear show={false || MessageBox.Props?.visible} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => messageBoxResolveFunc(MessageBox.Constants.Result.Cancel)}  >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className={"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 " + iconBgColorVariants[MessageBox.Props.hasOwnProperty("type") ? MessageBox.Props.type : MessageBox.Constants.Type.Information]}>
                                                {(MessageBox.Props.type === MessageBox.Constants.Type.Danger) && <FontAwesomeIcon icon={faExclamationTriangle} className={"text-xl " + iconColorVariants[MessageBox.Props.hasOwnProperty("type") ? MessageBox.Props.type : MessageBox.Constants.Type.Information]} />}
                                                {(MessageBox.Props.type === MessageBox.Constants.Type.Success) && <FontAwesomeIcon icon={faCheck} className={"text-xl " + iconColorVariants[MessageBox.Props.hasOwnProperty("type") ? MessageBox.Props.type : MessageBox.Constants.Type.Information]} />}
                                                {(MessageBox.Props.type === MessageBox.Constants.Type.Warning) && <FontAwesomeIcon icon={faExclamation} className={"text-xl " + iconColorVariants[MessageBox.Props.hasOwnProperty("type") ? MessageBox.Props.type : MessageBox.Constants.Type.Information]} />}
                                                {(MessageBox.Props.type === MessageBox.Constants.Type.Information) && <FontAwesomeIcon icon={faInfo} className={"text-xl " + iconColorVariants[MessageBox.Props.hasOwnProperty("type") ? MessageBox.Props.type : MessageBox.Constants.Type.Information]} />}
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{MessageBox.Props.title || ""}</h3>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-800">{MessageBox.Props.message || ""}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-10 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        {
                                            (MessageBox.Props.buttons === MessageBox.Constants.Buttons.OkCancel) &&
                                            <button type="button" onClick={() => messageBoxResolveFunc(MessageBox.Constants.Result.Ok)} className={"inline-flex w-full justify-center items-center rounded px-4 h-8 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto min-w-[64px] " + buttonBgColorVariants[MessageBox.Props.type]}>Ok</button>
                                        }
                                        {
                                            (MessageBox.Props.buttons === MessageBox.Constants.Buttons.YesNoCancel) &&
                                            <>
                                                <button type="button" onClick={() => messageBoxResolveFunc(MessageBox.Constants.Result.Yes)} className={"inline-flex w-full justify-center items-center rounded px-4 h-8 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto min-w-[64px] " + buttonBgColorVariants[MessageBox.Props.type]}>Yes</button>
                                                <button type="button" onClick={() => messageBoxResolveFunc(MessageBox.Constants.Result.No)} className={"inline-flex w-full justify-center items-center rounded px-4 h-8 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto min-w-[64px] " + buttonBgColorVariants[MessageBox.Props.type]}>No</button>
                                            </>
                                        }
                                        <button type="button" onClick={() => messageBoxResolveFunc(MessageBox.Constants.Result.Cancel)} className={"inline-flex w-full justify-center items-center rounded px-4 h-8 text-sm font-semibold text-gray-600 bg-gray-100 shadow-sm sm:ml-3 sm:w-auto "}>Cancel</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            {/* <div className={"relative z-100 " + (show ? "" : "hidden")} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-3 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className={"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 " + iconBgColorVariants[type]}>
                                        {(type === MessageBoxConstants.Type.Danger) && <FontAwesomeIcon icon={faExclamationTriangle} className={"text-xl " + iconColorVariants[type]} />}
                                        {(type === MessageBoxConstants.Type.Success) && <FontAwesomeIcon icon={faCheck} className={"text-xl " + iconColorVariants[type]} />}
                                        {(type === MessageBoxConstants.Type.Warning) && <FontAwesomeIcon icon={faExclamation} className={"text-xl " + iconColorVariants[type]} />}
                                        {(type === MessageBoxConstants.Type.Information) && <FontAwesomeIcon icon={faInfo} className={"text-xl " + iconColorVariants[type]} />}
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-800">{message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-10 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                {
                                    buttons && Array.isArray(buttons) && buttons.map((btn, i) =>
                                        <button key={i} type="button" onClick={btn.onClick} className={"inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto " + buttonBgColorVariants[type]}>{btn.caption}</button>)
                                }
                                <button type="button" onClick={close} className={"inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 shadow-sm sm:ml-3 sm:w-auto "}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}