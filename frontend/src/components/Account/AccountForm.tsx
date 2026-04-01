import React from "react";
import Input from "../../common/Input";
import Button from "../../common/Button";
import Radio from "../../common/Radio";

interface Props {
    formData: {
        fullName: string;
        phone: string;
        email: string;
        password: string;
        company: string;
        isAgency: string;
    };

    onChange: (field: keyof Props['formData'], value: string) => void;
    onSubmit: () => void;
}

const AccountForm: React.FC<Props> = ({ formData, onChange, onSubmit }) => {
    return (
        <div className="h-full flex flex-col justify-between p-5">
            <div>
                <h1 className="text-[28px] w-[188px] font-medium mb-[30px]">
                    Create your PopX account
                </h1>

                <div className="flex flex-col gap-[29px]">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        type="text"
                        value={formData.fullName}
                        onChange={(val) => onChange("fullName", val)}
                        required
                    />

                    <Input
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        type="tel"
                        value={formData.phone}
                        onChange={(val) => onChange("phone", val)}
                        required
                    />

                    <Input
                        label="Email Address"
                        placeholder="Enter your email"
                        type="email"
                        value={formData.email}
                        onChange={(val) => onChange("email", val)}
                        required
                    />

                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={formData.password}
                        onChange={(val) => onChange("password", val)}
                        required
                    />

                    <Input
                        label="Company Name"
                        placeholder="Enter your company name"
                        type="text"
                        value={formData.company}
                        onChange={(val) => onChange("company", val)}
                        required={false}
                    />

                    <div className="-mt-[9px]">
                        <Radio
                            question="Are you an Agency?"
                            options={["Yes", "No"]}
                            name="agency"
                            required
                            value={formData.isAgency}
                            onChange={(val: string) => onChange("isAgency", val)}
                        />
                    </div>
                </div>
            </div>

            <Button
                text="Create Account"
                textColor="text-[#FFFFFF]"
                bgColor="bg-[#6C25FF]"
                start={onSubmit}
            />
        </div>
    );
};

export default AccountForm;