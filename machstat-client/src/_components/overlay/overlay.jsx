import React, { Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { usePageStateService } from "../../_contexts/PageStateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Overlay({ close, children }) {
  const {PageState} = usePageStateService();
  return (
    <Transition appear show={PageState.waiting} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}  >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity pointer-events-none" />
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
              <Dialog.Panel className="transform overflow-hidden rounded-lg bg-white text-left align-middle transition-all">
                <div className="flex items-center justify-center text-md font-inter py-4 px-6 text-gray-600 bg-gradient-to-b from-white to-gray-300">
                  <span>Please wait...</span>
                  <FontAwesomeIcon icon={faSpinner} className="ml-4 animate-spin" />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const Title = ({ children }) => <div>{children}</div>
Title.displayName = "Title";

const Content = ({ children }) => <div>{children}</div>
Content.displayName = "Content";

const Commands = ({ children }) => <div>{children}</div>
Commands.displayName = "Commands";


Overlay.Title = Title;
Overlay.Content = Content;
Overlay.Commands = Commands

export default Overlay;