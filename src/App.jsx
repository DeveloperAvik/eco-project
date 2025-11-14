import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import AddChallenge from "./pages/AddChallenge";
import MyActivities from "./pages/MyActivities";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import EditChallenge from "./pages/EditChallenge";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:id" element={<ChallengeDetail />} />
        <Route path="/challenges/add" element={<ProtectedRoute><AddChallenge /></ProtectedRoute>} />
        <Route path="/my-activities" element={<ProtectedRoute><MyActivities /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/challenges/edit/:id"
          element={
        <ProtectedRoute>
          <EditChallenge />
        </ProtectedRoute>
  }
/>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}