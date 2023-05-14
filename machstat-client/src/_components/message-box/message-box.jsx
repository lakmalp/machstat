import { faCheck, faExclamation, faExclamationTriangle, faHandHoldingHand, faInfo, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-regular-svg-icons";
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

    const borderColorVariants = {
        [MessageBox.Constants.Type.Danger]: "border-red-500",
        [MessageBox.Constants.Type.Success]: "border-green-600",
        [MessageBox.Constants.Type.Warning]: "border-yellow-500",
        [MessageBox.Constants.Type.Information]: "border-blue-500"
    }

    return (
        <>
            <Transition appear show={false || MessageBox.Props?.visible} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={() => messageBoxResolveFunc(MessageBox.Constants.Result.Cancel)}  >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity pointer-events-none" />
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
                                <Dialog.Panel className={"w-full max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all border-t-4 " + borderColorVariants[MessageBox.Props.type]}>
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className={"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 " + iconBgColorVariants[MessageBox.Props.hasOwnProperty("type") ? MessageBox.Props.type : MessageBox.Constants.Type.Information]}>
                                                {(MessageBox.Props.type === MessageBox.Constants.Type.Danger) && <FontAwesomeIcon icon={faHand} className={"text-xl " + iconColorVariants[MessageBox.Props.hasOwnProperty("type") ? MessageBox.Props.type : MessageBox.Constants.Type.Information]} />}
                                                {(MessageBox.Props.type === MessageBox.Constants.Type.Success) && <FontAwesomeIcon icon={faCheck} className={"text-xl " + iconColorVariants[MessageBox.Props.hasOwnProperty("type") ? MessageBox.Props.type : MessageBox.Constants.Type.Information]} />}
                                                {(MessageBox.Props.type === MessageBox.Constants.Type.Warning) && <FontAwesomeIcon icon={faExclamation} className={"text-xl " + iconColorVariants[MessageBox.Props.hasOwnProperty("type") ? MessageBox.Props.type : MessageBox.Constants.Type.Information]} />}
                                                {(MessageBox.Props.type === MessageBox.Constants.Type.Information) && <FontAwesomeIcon icon={faInfo} className={"text-xl " + iconColorVariants[MessageBox.Props.hasOwnProperty("type") ? MessageBox.Props.type : MessageBox.Constants.Type.Information]} />}
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                                <h3 className="text-base font-semibolda leading-6 font-roboto border-b" id="modal-title">
                                                    {(MessageBox.Props.type === MessageBox.Constants.Type.Danger) && <span className=" text-red-700">{MessageBox.Props.title || ""}</span>}
                                                    {(MessageBox.Props.type === MessageBox.Constants.Type.Success) && <span className=" text-green-700">{MessageBox.Props.title || ""}</span>}
                                                    {(MessageBox.Props.type === MessageBox.Constants.Type.Warning) && <span className=" text-orange-700">{MessageBox.Props.title || ""}</span>}
                                                    {(MessageBox.Props.type === MessageBox.Constants.Type.Information) && <span className=" text-blue-700">{MessageBox.Props.title || ""}</span>}
                                                </h3>
                                                <div className="mt-3 font-roboto">
                                                    <div className="text-sm text-gray-800">{MessageBox.Props.message || ""}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50a px-10 py-3 sm:flex sm:flex-row-reverse sm:px-6 font-roboto">
                                        <ButtonPanel buttons={MessageBox.Props.buttons} onClick={messageBoxResolveFunc} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

const ButtonPanel = ({ buttons, onClick }) => {
    const btnArray = buttons.split(/(?=[A-Z])/);
    return (
        btnArray.map(
            btn => <button
                key={btn}
                type="button"
                onClick={() => onClick(btn)}
                className={"hover:drop-shadow-md border inline-flex w-full justify-center items-center rounded px-4 h-8 text-sm text-gray-600 font-medium sm:ml-3 sm:w-auto min-w-[64px] bg-gradient-to-b from-white to-gray-100 "}
            >
                {btn}
            </button>
        )
    )
}