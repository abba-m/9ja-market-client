import {
  Box,
  Center,
  FormControl,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { rpcClient } from "services/rpcClient";
import { states } from "utils/cities";
import AddressCard from "./addressCard";

const Address = () => {
  const toast = useToast();
  const formRef = useRef();
  const [isLargeScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  const { currentUser } = useSelector((state) => ({
    currentUser: state.auth.user,
  }));

  const [addresses, setAddresses] = useState([]);

  const [street, setStreet] = useState("");
  const [cityId, setCityId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [country, setCountry] = useState("Nigeria");

  const fetchAddresses = async () => {
    const addresses = await rpcClient.request("getAddresses");
    if (!addresses) return;

    setAddresses(addresses);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDeleteAddress = async (userAddressId) => {
    if (!userAddressId) return;

    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Are you sure you want to delete Address?")) return;

    await rpcClient.request("deleteAddress", { userAddressId });
    fetchAddresses();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!street) return toast({
      position: "top",
      title: "Please input street address",
      status: "info",
      isClosable: true,
    });

    const state = states.find((state) => Number(state.stateId) === Number(stateId));
    
    if (!state) return toast({
      position: "top",
      title: "Please select a State for address",
      status: "info",
      isClosable: true,
    });

    const city = state.data.find(city => Number(cityId) === Number(city.id));
    if (!city) return toast({
      position: "top",
      title: "Please select a City for address",
      status: "info",
      isClosable: true,
    });

    const data = {
      street,
      state: state.state,
      city: city?.name,
      country,
    };

    setStateId(0);
    setCountry("Nigeria");

    await rpcClient.request("createAddress", data);
    if (formRef) formRef?.current?.reset();
    setStreet("");
    fetchAddresses();
  };

  return (
    <Box w="80vw">
      <form ref={formRef} onSubmit={(e) => handleFormSubmit(e)}>
        <FormControl>
          <Box my={2}>
            <Text color="primary">Street Name</Text>
            <Input
              type="text"
              placeholder={currentUser?.street || "street"}
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </Box>
          <Box my={2}>
            <Text color="primary">state</Text>
            <Select 
              onChange={({ target }) => setStateId(target.value)} 
              placeholder="--select state--"
            >
              {states.map(({state, stateId}) => (
                <option
                  key={stateId}
                  value={stateId}
                >
                  {state}
                </option>
              ))}
            </Select>
          </Box>
          <Box my={2}>
            <Text color="primary">City</Text>
            <Select
              onChange={({ target }) => setCityId(target.value)}
              placeholder="--select city--"
            >
              {states.find((state) => Number(state.stateId) === Number(stateId))
                ?.data?.map((ct) => (
                  <option key={ct.id} value={ct.id}>
                    {ct.name}
                  </option>
                ))}
            </Select>
          </Box>
          <Box my={2}>
            <Text color="primary">Country</Text>
            <Select variant="filled">
              <option value="option1">Nigeria</option>
            </Select>
          </Box>
          <Box my={2}>
            <Input bgColor="primary" type="submit" value="Create address" />
          </Box>
        </FormControl>
      </form>

      {isLargeScreen ? (
        <TableContainer overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Country</Th>
                <Th>State</Th>
                <Th>City</Th>
                <Th>Street</Th>
              </Tr>
            </Thead>
            <Tbody>
              {addresses?.length !== 0 && (
                addresses.map(({ country, state, city, street }) => ( <Tr>
                  <Td>{country}</Td>
                  <Td>{state}</Td>
                  <Td>{city}</Td>
                  <Td>{street}</Td>
                </Tr>
                )))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <AddressCard handleDeleteAddress={handleDeleteAddress} addresses={addresses} />
      )}
      {addresses?.length !== 0 && (
        <Center my={3}>
          <Text color="teal.500" fontSize="sm">Double tap to delete address</Text>
        </Center>
      )}
    </Box>
  );
};

export default Address;
