import React from "react";

type SetButtonProps = {
  handleValueSetting: () => void;
};

function SetButton({ handleValueSetting }: SetButtonProps) {
  return (
    <button
      onClick={() => handleValueSetting()}
      className="text-blue-700 hover:text-blue-900 p-2 m-2 bg-gray-800 rounded-lg w-32 h-10 self-center"
    >
      set
    </button>
  );
}

export default SetButton;
