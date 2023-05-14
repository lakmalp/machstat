import React, { Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'

function DialogBox({ show = false, close, children }) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}  >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity pointer-events-none" />
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
                <div className="font-semibold font-inter text-sm px-6 py-2 text-gray-700 bg-gray-100">
                  {/* <FontAwesomeIcon icon={faDisplay} className="mr-2" /> */}
                  {
                    children.map((child,i) => {
                      if (child.type.displayName === "Title") {
                        return <div key={i}>{child.props.children}</div>
                      }
                    })
                  }
                </div>
                <div className="px-6 pt-2 pb-4">
                  {
                    children.map((child,i) => {
                      if (child.type.displayName === "Content") {
                        return <div key={i}>{child.props.children}</div>
                      }
                    })
                  }
                  <div className="mt-8 flex justify-end ">
                    <button
                      type="button"
                      className=" rounded-md border border-transparent  px-4 h-8 text-sm font-inter font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200"
                      onClick={close}
                    >
                      Cancel
                    </button>
                    {
                      children.map((child,i) => {
                        if (child.type.displayName === "Commands") {
                          return <div key={i}>{child.props.children}</div>
                        }
                      })
                    }
                  </div>
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


DialogBox.Title = Title;
DialogBox.Content = Content;
DialogBox.Commands = Commands

export default DialogBox;