import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (user) return children;
  return <Navigate to="/login" />;
};

export default PrivateRouter;
