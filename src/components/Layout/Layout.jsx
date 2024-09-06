import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logoutThunk } from "../../redux/auth/authSlice";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((store) => store.auth);

  const handleLogout = () => dispatch(logoutThunk());
  const handleBackNavigation = () => navigate(-1);

  return (
    <div>
      <button onClick={handleBackNavigation}>Ir atrás</button>
      {isAuthenticated && <button onClick={handleLogout}>Cerrar sesión</button>}
      Layout
      <Outlet />
    </div>
  );
};

export default Layout;
