import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { UserInfo } from "../interfaces/interfaces";

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();
  const userInfo: UserInfo = useSelector(
    (state: IRootState) => state.userReducer?.userInfo as UserInfo
  );

  const allowedRoutes = ["/profile", "/chat"];
  const currentRoute = window.location.pathname;
  const isAllowedRoute = allowedRoutes.includes(currentRoute);

  useEffect(() => {
    if (!userInfo || !userInfo.accessToken) {
      navigate("/login");
    }
  }, [userInfo, navigate, isAllowedRoute]);

  return <Outlet />;
};

export default ProtectedRoute;
