import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function SettingsView() {
  const [currentUser, setCurrentUser] = useState({});
  const { currentUserId } = useSelector((state) => ({
    currentUserId: state?.auth?.user?.id,
  }));

  //tobe refactored
  const getUserProvider = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/users/${currentUserId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();
    setCurrentUser(data);
  };

  useEffect(() => {
    //TODO: implement that try catch wrapper from linkedIn
    try {
      getUserProvider();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Box ml={6}>
      <Text>Hello profile settings view</Text>
      <Text my={8}>
        Hello <b>{currentUser.fullName || "User"}!</b> Remember you signed up
        with {currentUser.provider || "9jaMarket"}
      </Text>
    </Box>
  );
}

export default SettingsView;
