import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from "./pages/Profile";
import ChatRoom from "./pages/ChatRoom";
import ProtectedRoute from "./router/ProtectedRoute";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/chat" element={<ProtectedRoute />}>
          <Route index element={<ChatRoom />} />
          <Route path="group/:channelName" element={<ChatRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
