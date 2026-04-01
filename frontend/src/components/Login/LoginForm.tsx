import React from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";

export interface LoginState {
    fullName: string;
    phoneNumber: string;
}

interface LoginFormProps {
    formData: LoginState;
    onChange: (field: keyof LoginState, value: string) => void;
    onSubmit: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
    formData,
    onChange,
    onSubmit,
}) => {
    return (
        <div className="p-5">
            <div className="w-[232px] mb-6">
                <h1 className="text-[#1D2226] text-[28px] font-medium">
                    Signin to your PopX account
                </h1>

                <p className="text-[#1D2226]/60 text-[18px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
            </div>

            <div className="flex flex-col gap-[29px]">
                <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    type="text"
                    value={formData.fullName}
                    onChange={(val) => onChange("fullName", val)}
                    required={true}
                />

                <Input
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(val) => onChange("phoneNumber", val)}
                    required={true}
                />
            </div>

            <div className="flex flex-col gap-[10px] pt-[29px]">
                <Button
                    text="Login"
                    textColor="text-[#FFFFFF]"
                    bgColor="bg-[#CBCBCB]"
                    start={onSubmit}
                />
            </div>
        </div>
    );
};

export default LoginForm;