import React from 'react'
import Home from './components/Home';
import AccountContainer from './components/Account/AccountContainer';
import LoginContainer from './components/Login/LoginContainer';
import Profile from './components/Profile';

function App() {
  const [step, setStep] = React.useState(1)
  return (
    <div className="max-w-[375px] h-screen mx-auto bg-[#F7F8F9] text-[#1D2226] border">
      {step === 1 && <Home setStep={setStep} />}
      {step === 2 && <AccountContainer setStep={setStep} />}
      {step === 3 && <LoginContainer setStep={setStep} />}
      {step === 4 && <Profile />}
    </div>
  )
}

export default App
