import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from 'store/actions';
import { useNavigate, useLocation } from 'react-router-dom';
import { sendRequest } from "utils/connection";

export default function GoogleAuthRedirect(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const dispatch = useDispatch();

  const processRequest = async () => {
    const [res, error] = sendRequest(fetch(`${process.env.REACT_APP_SERVER_URL}/api/connect/google/callback/${location.search}`))

    if (error) {
      toast({
        position: "top",
        title: "An Error occured! Please try again.",
        status: "error",
        isClosable: true,
      });
      console.log(error);
      //navigate("/")
    }

    const data = await res.json();
    if (data) {
      console.log("[googleRes]:", data);
    }
  }

  useEffect(() => {


    // fetch(`${process.env.REACT_APP_SERVER_URL}/api/connect/google/callback/${location.search}`).then((res) => {
    //   if (res.status !== 200) {
    //     throw new Error(`Couldn't login to 9jaMarket. Status: ${res.status}`)
    //   }
    //   return res
    // }).then((res) => res.json())
    //   .then((res) => {
    //     console.log("[googleRes]:", res);
    //     return res;
    //   })
    //   .then((data) => dispatch(loginSuccess(data)))
    //   .then(() => toast({
    //     position: "top",
    //     title: "Login successful!.",
    //     status: "info",
    //     isClosable: true,
    //   }))
    //   .catch((err) => {
    //     toast({
    //       position: "top",
    //       title: "An Error occured! Please try again.",
    //       status: "error",
    //       isClosable: true,
    //     });
    //     console.log(err)
    //   })
    //   .finally(navigate("/"))
  }, [])

  // console.log("[LOCATION]", location.search)

  return (
    <div>Please wait...</div>
  )
}
