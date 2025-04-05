import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: Props) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
