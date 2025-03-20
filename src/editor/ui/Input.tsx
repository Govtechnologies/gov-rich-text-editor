import React from "react";

type InputProps = {
  label?: string;
  type?: string;
  value?: string;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  "data-testid"?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onInput,
  className = "",
  ...rest
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-xs font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onInput={onInput}
        className={`border w-full rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...rest}
      />
    </div>
  );
};

export default Input;
