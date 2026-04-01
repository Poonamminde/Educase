import React, { useReducer } from "react";
import LoginForm from "./LoginForm";

interface LoginProps {
    setStep: (step: number) => void;
}

export interface LoginState {
    fullName: string;
    phoneNumber: string;
}

type LoginAction =
    | { type: "SET_FIELD"; field: keyof LoginState; value: string }
    | { type: "RESET" };

const initialState: LoginState = {
    fullName: "",
    phoneNumber: "",
};

function loginReducer(
    state: LoginState,
    action: LoginAction
): LoginState {
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

const LoginContainer: React.FC<LoginProps> = ({ setStep }) => {
    const [state, dispatch] = useReducer(loginReducer, initialState);

    const handleChange = (field: keyof LoginState, value: string) => {
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
        <LoginForm
            formData={state}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};

export default LoginContainer;