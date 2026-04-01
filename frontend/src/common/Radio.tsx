import React from "react";

interface RadioProps {
    question: string;
    options: string[];
    name: string;
    required: boolean;
    value: string;
    onChange: (value: string) => void;
};

const Radio: React.FC<RadioProps> = ({ question, options, name, required, value, onChange }) => {

    return (
        <div className="flex flex-col gap-2 text-[13px]">
            <p>
                {question}{required && <span className="text-[#DD4A3D] h-[6px] w-[6px]">*</span>}
            </p>

            <div className="flex gap-6">
                {options.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === option}
                            onChange={() => onChange(option)}
                            className="scale-150 accent-[#6C25FF]"
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Radio;