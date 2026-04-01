import React, { useReducer } from "react";
import AccountForm from "./AccountForm";

interface AccountProps {
  setStep: (step: number) => void;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  company: string;
  isAgency: string;
}

type Action =
  | { type: "SET_FIELD"; field: keyof FormState; value: string }
  | { type: "RESET" };

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  password: "",
  company: "",
  isAgency: "",
};

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

const AccountContainer: React.FC<AccountProps> = ({ setStep }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange = (field: keyof FormState, value: string) => {
    dispatch({
      type: "SET_FIELD",
      field,
      value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Data:", state);
    setStep(4);
  };

  return (
    <AccountForm
      formData={state}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  );
};

export default AccountContainer;