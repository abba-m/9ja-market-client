import userProfileImage from "../assets/images/AdobeStock_297369693 1.png";
import locationIcon from "../assets/icons/Vector.svg";
import {
  Button,
  Container,
  Image,
  Flex,
  Box,
  Center,
  Text,
} from "@chakra-ui/react";

const ProfilePage = () => {
  return (
    <>
      <Box
        width="100%"
        height="100vh"
        p="20px 50px"
        flexDirection={["column", "row"]}
        display="flex"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          h={["100%", "70%"]}
          width={["100%", "25%"]}
          boxShadow="0px 4px 15px rgba(0, 0, 0, 0.25)"
          bgColor="#FCF8F8"
          flexDirection="column"
          borderRadius="15px"
        >
          <Box
            position="relative"
            borderTopRadius="15px"
            bg="orange.200"
            bgImage={userProfileImage}
            width="100%"
            h="30%"
          >
            <Center>
              <Box
                w="100px"
                h="100px"
                position="absolute"
                bottom="-45px"
                borderRadius="50%"
                bgImage={"url({userProfileImage})"}
                bg="orange.400"
              >
                <Image src={userProfileImage} alt="user profile image" />
              </Box>
            </Center>
          </Box>

          <Box p="0 10px 20px 10px" w="100%" h="70%">
            <Center>
              <Text mt="56px" fontSize="1.5rem">
                john doe
              </Text>
            </Center>
            <Box h="60px" display="flex" alignItems="center">
              <svg
                width="28"
                height="34"
                viewBox="0 0 28 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 0.375C10.5369 0.379086 7.21675 1.75662 4.76794 4.20543C2.31913 6.65424 0.941599 9.97436 0.937514 13.4375C0.933366 16.2676 1.8578 19.0209 3.56901 21.275C3.56901 21.275 3.92526 21.7441 3.98345 21.8118L14 33.625L24.0213 21.8058C24.0736 21.7429 24.431 21.275 24.431 21.275L24.4322 21.2714C26.1426 19.0183 27.0666 16.2663 27.0625 13.4375C27.0584 9.97436 25.6809 6.65424 23.2321 4.20543C20.7833 1.75662 17.4632 0.379086 14 0.375ZM14 18.1875C13.0606 18.1875 12.1422 17.9089 11.3611 17.387C10.5799 16.865 9.9711 16.1232 9.61159 15.2552C9.25207 14.3873 9.158 13.4322 9.34128 12.5108C9.52456 11.5894 9.97696 10.743 10.6413 10.0787C11.3056 9.41444 12.1519 8.96205 13.0733 8.77877C13.9947 8.59549 14.9498 8.68956 15.8178 9.04907C16.6857 9.40859 17.4276 10.0174 17.9495 10.7985C18.4714 11.5797 18.75 12.498 18.75 13.4375C18.7484 14.6968 18.2475 15.9041 17.357 16.7945C16.4666 17.685 15.2593 18.1859 14 18.1875Z"
                  fill="#4ECB71"
                />
              </svg>
              <Text fontSize="1rem" marginTop="10px" pl="15px">
                Some street across the road avenue near somewhre
              </Text>
            </Box>
            <Box m="15px 0 15px 40px ">
              <Text color="green.400">Joined</Text>
              <Text>05-03-2020</Text>
            </Box>
            <Button w="100%" bgColor="green.500" mb="auto">
              <Text>08122334455</Text>
            </Button>
          </Box>
        </Box>

        <Box w="60%" h="100%" bgColor="blue.200"></Box>
      </Box>
    </>
  );
};

export default ProfilePage;
