import React from "react";

type SetButtonProps = {
  handleValueSetting: () => void;
};

function SetButton({ handleValueSetting }: SetButtonProps) {
  return (
    <button
      onClick={() => handleValueSetting()}
      className="apple-button flex items-center justify-center min-w-[120px] py-3 px-6 mt-6 self-center"
    >
      <span className="font-medium">Set</span>
    </button>
  );
}

export default SetButton;
