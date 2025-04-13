
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;
  if (user) return children;
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRouter;
