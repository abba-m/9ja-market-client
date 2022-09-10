import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "store/actions";
import { useNavigate, useLocation } from "react-router-dom";
import { sendRequest } from "utils/connection.utils";

export default function GoogleAuthRedirect(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const dispatch = useDispatch();

  const processRequest = async () => {
    const [res, error] = await sendRequest(
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/google/callback/${location.search}`
      )
    );

    if (error) {
      toast({
        position: "top",
        title: "An Error occured! Please try again.",
        status: "error",
        isClosable: true,
      });
      navigate("/");
    }

    const data = await res.json();
    if (data) {
      dispatch(loginSuccess(data));
      toast({
        position: "top",
        title: "Login successful!.",
        status: "info",
        isClosable: true,
      });
      navigate("/");
    }
  };

  useEffect(() => {
    processRequest();
  }, []);

  return <div>Please wait...</div>;
}
