import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export const IsAuthenticated = ({ Component }) => {
  const navigate = useNavigate();

  if (Cookies.get("authConfirm")) {
    return <Component />;
  }

  navigate("/admin/panel");
};

export const IsNotAutheticated = ({ Component }) => {
  const navigate = useNavigate();

  if (!Cookies.get("authConfirm")) {
    return <Component />;
  }

  navigate("/admin");
};