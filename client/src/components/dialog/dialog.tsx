import React, { useState } from "react";
import "./dialog.css";

interface IDialogProps {
  triggerButtonLabel: string;
  triggerButtonClassName?: string;
  header: string;
  content: React.JSX.Element;
  okButtonLabel?: string;
  okButtondisabled?: boolean;
  onOpen?: () => void;
  onCancel?: () => void;
  onConfirm: () => boolean | Promise<boolean>;
}

export const Dialog = ({
  triggerButtonLabel,
  triggerButtonClassName = "",
  header,
  content,
  okButtonLabel = "Ok",
  okButtondisabled = false,
  onOpen,
  onCancel,
  onConfirm,
}: IDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleClickToOpen = () => {
    if (onOpen) {
        onOpen()
    }
    setOpen(true);
  };

  const handleConfirm = async() => {
    if (await onConfirm()) {
      setOpen(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
        onCancel();
    }
    setOpen(false);
  };

  const dialog = open ? (
    <div className="dialog">
      <div className="dialog-wrapper">
        <div className="dialog-header">{header}</div>
        <div className="dialog-content">{content}</div>
        <div className="dialog-footer">
          <button
            className="button dialog-cancel-button"
            onClick={handleCancel}
          >
            Отмена
          </button>{" "}
          <button className="button dialog-ok-button" disabled={okButtondisabled} onClick={handleConfirm}>
            {okButtonLabel}
          </button>{" "}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        className={`button ${triggerButtonClassName}`}
        onClick={handleClickToOpen}
      >
        {triggerButtonLabel}
      </button>
      {dialog}
    </>
  );
};
