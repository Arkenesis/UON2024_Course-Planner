import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login/Login.jsx';
import ResetPassword from './pages/reset_password/ResetPassword.jsx';
import TermsAndConditions from "./pages/termsandconditions/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/privacypolicy/PrivacyPolicy.jsx";
import Footer from "./components/Footer.jsx";

function App() {

  return (
    <>
      <Login/>
      <ResetPassword/>
      <TermsAndConditions/>
      <Footer/>
      <PrivacyPolicy/>
    </>
  );
}

export default App;
