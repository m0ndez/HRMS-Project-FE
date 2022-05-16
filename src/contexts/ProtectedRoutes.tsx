import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const refToken = useSelector<RootReducers>(
    (e) => e.authentication.token.token
  );
  return !isEmpty(refToken);
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
