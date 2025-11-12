"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import MyButton from "../ui/MyButton";

interface IProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  actionLabel: string;
  disable?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<IProps> = ({
  actionLabel,
  onClose,
  onSubmit,
  body,
  disable,
  footer,
  isOpen,
  secondaryAction,
  secondaryActionLabel,
  title,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handelClose = useCallback(() => {
    if (disable) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disable, onClose]);

  const handleSubmit = useCallback(() => {
    if (disable) return;
    onSubmit();
  }, [disable, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disable || !secondaryAction) return;

    secondaryAction();
  }, [disable, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        {/* The All Model */}
        <div className="relative w-full h-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto  lg:h-auto md:h-auto">
          {/* The content */}
          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="translate h-full md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* Header Component */}
              <div className="flex items-center justify-center p-6 rounded-md relative border-b border-b-gray-200">
                <button
                  onClick={handelClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9 cursor-pointer"
                >
                  <IoMdClose />
                </button>
                <p className="text-lg font-semibold">{title}</p>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">{body}</div>
              {/* Footer */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex items-center gap-4 w-full">
                  {secondaryActionLabel && (
                    <MyButton
                      outline
                      disabled={disable}
                      onClick={handleSecondaryAction}
                      label={secondaryActionLabel}
                    />
                  )}
                  <MyButton
                    disabled={disable}
                    onClick={handleSubmit}
                    label={actionLabel}
                  />
                </div>

                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
