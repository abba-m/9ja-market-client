import locationIcon from "../assets/icons/Vector.svg";
import {
  Button,
  Box,
  Center,
  Text,
  Avatar,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
import { rpcClient } from "services/rpcClient";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDateJoined } from "utils/format.utils";
import AdThumbnail from "components/adThumbnail/adThumbnail";
import defaultImage from "assets/images/defaultImage.jpeg";
import ShortUniqueId from "short-unique-id";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useParams();
  const [isLoading, ssetIsLoading] = useState(false);
  const toggleIsLoading = () => ssetIsLoading((val) => !val);
  const uid = new ShortUniqueId({ length: 5 });

  const getUserInfo = async () => {
    toggleIsLoading();

    const response = await rpcClient.request("getUserById", { userId });

    if (response === null) throw new Error("Something went wrong");

    toggleIsLoading();

    setUserData(response);
  };

  const getPostById = async () => {
    const posts = await rpcClient.request("getPostOfUserById", { userId });
    if (!posts) return;

    setUserPosts(posts);
  };

  useEffect(() => {
    getUserInfo();
    getPostById();
  }, []);

  return (
    <>
      <Box
        width="100%"
        height="100vh"
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        display="flex"
        gap={"2rem"}
        mt={10}
        px={5}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Box
            display="flex"
            marginInline="auto"
            maxH={{ md: "40%", lg: "60%" }}
            minH={{ base: "25rem" }}
            width={{ base: "85%", md: "45%", lg: "25%" }}
            boxShadow="0px 4px 15px rgba(0, 0, 0, 0.25)"
            bgColor="#FCF8F8"
            flexDirection="column"
            alignSelf={{ base: "center", md: "center", lg: "start" }}
            borderRadius="15px"
          >
            <Box
              position="relative"
              borderTopRadius="15px"
              bgImage={userData?.avatarUrl}
              bgRepeat="no-repeat"
              bgSize="cover"
              width="100%"
              h="9rem"
              bgColor="blue"
            >
              <Center>
                <Box
                  w="100px"
                  h="100px"
                  position="absolute"
                  bottom="-45px"
                  borderRadius="50%"
                  bgImage={"url({userProfileImage})"}
                >
                  <Avatar
                    size={"xl"}
                    name={userData?.fullName || "New User"}
                    src={userData?.avatarUrl}
                  />
                </Box>
              </Center>
            </Box>

            <Box p="0 10px 20px 10px" w="100%" h="70%">
              <Center>
                <Text mt="56px" fontSize="1.5rem">
                  {userData.fullName}
                </Text>
              </Center>
              <Box h="60px" display="flex" alignItems="center">
                <img src={locationIcon} alt="location Icon" />
                <Text fontSize="1rem" marginTop="10px" pl="15px">
                  {userData?.UserAddresses?.map((address) => (
                    <>
                      {address.street} {address.city} {address.state}
                    </>
                  ))}
                </Text>
              </Box>
              <Box display={"flex"} gap="0.5rem" m="15px 0 15px 40px ">
                <Text color="green.400">Joined</Text>
                <Text>{formatDateJoined(userData.createdAt)}</Text>
              </Box>
              <Button w="100%" bgColor="green.500" mb="auto">
                <Text>{userData?.phone}</Text>
              </Button>
            </Box>
          </Box>
        )}
        <Box mb="1rem">
          <SimpleGrid
            marginInline="auto"
            columns={{ base: "2", md: "2", lg: "4" }}
            spacing={4}
            maxW={{ base: "400px", md: "700px", lg: "1100px" }}
          >
            {userPosts?.length ? (
              userPosts.map(
                ({ postId, images, title, price, location, slug }) => {
                  //TODO: optimize images
                  const imagesUrl = images.split(",");

                  return (
                    <Link key={uid()} to={`/post/${slug}`}>
                      <AdThumbnail
                        key={uid()}
                        postId={postId}
                        imageSrc={
                          imagesUrl.length ? imagesUrl[0] : defaultImage
                        }
                        adTitle={title}
                        adPrice={price}
                        adLocation={location}
                        hideSaveBtn={true}
                      />
                    </Link>
                  );
                }
              )
            ) : (
              <p>You don't have any post yet</p>
            )}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
