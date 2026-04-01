import React from "react";
import Button from "../common/Button";

interface HomeProps {
  setStep: (step: number) => void;
}

const Home: React.FC<HomeProps> = ({ setStep }) => {
  return (
    <div className="min-h-screen flex flex-col justify-end  p-5">
      <div>
        <div className="w-[232px]">
        <h1 className="text-[#1D2226] text-[28px] font-medium">Welcome to PopX</h1>

        <p className="text-[#1D2226]/60 text-[18px] font-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        </div>
        <div className="flex flex-col gap-[10px] pt-[29px]">

        <Button
          text="Create Account"
          textColor="text-[#FFFFFF]"
          bgColor="bg-[#6C25FF]"
          start={() => setStep(2)}
        />

        <Button
          text="Already Registered? Login"
          textColor="text-[#1D2226]"
          bgColor="bg-[#6C25FF4B]"
          start={() => setStep(3)}
        />
        </div>
      </div>
    </div>
  );
};

export default Home;