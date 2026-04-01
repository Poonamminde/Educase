import React from 'react'

interface InputProps {
    label: string;
    placeholder: string;
    type: string;
    required: boolean;
    value: string;
    onChange: (value: string) => void;
}
const Input: React.FC<InputProps> = ({ label, placeholder, type, required, value, onChange }) => {
    return (
        <div className="w-full h-[40px] relative border rounded-md border-solid border-[#CBCBCB]">
            <div className="absolute top-[-10px] left-[9px] text-[13px] text-[#6C25FF] bg-[#F7F8F9] pr-4 pl-[5px] z-1">
                <label>{label}</label>
                {required && <span className="text-[#DD4A3D] h-[6px] w-[6px]">*</span>}
            </div>
            <input type={type} placeholder={placeholder} value={value} className="border-none h-[40px] w-full px-[14px] text-[13px] outline-none focus:outline-none focus:ring-0" onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}

export default Input