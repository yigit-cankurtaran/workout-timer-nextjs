import React from "react";

type SetButtonProps = {
  handleValueSetting: () => void;
};

function SetButton({ handleValueSetting }: SetButtonProps) {
  return (
    <button
      onClick={() => handleValueSetting()}
      className="text-slate-300 hover:text-white text-xl font-bold text-center p-4 m-4 bg-gray-800 rounded-lg w-48 self-center"
    >
      set
    </button>
  );
}

export default SetButton;
