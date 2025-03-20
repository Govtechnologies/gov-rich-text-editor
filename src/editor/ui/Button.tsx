import React from "react";
import Tooltip from "./Tooltip";

type IconButtonProps = {
  name: string;
  icon: any;
  isActive: boolean;
  onClick: () => void;
  isDisabled?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({
  name,
  icon,
  isActive,
  onClick,
  isDisabled,
}) => {
  return (
    <Tooltip text={name}>
      <button
        disabled={isDisabled}
        className={`p-2 rounded-md flex items-center justify-center text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500 hover:text-black dark:hover:text-white ${
          isActive ? "border" : "border-none"
        }`}
        onClick={onClick}
      >
        {icon}
      </button>
    </Tooltip>
  );
};

export default IconButton;
