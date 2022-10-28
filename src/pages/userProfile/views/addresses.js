import {
  Box,
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
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { cities } from "utils/cities";
import AddressCard from "./addressCard";

const Address = () => {
  const [isLargeScreen] = useMediaQuery([
    "(min-width: 768px)",
    "(max-width: 480px)",
  ]);

  const { currentUser } = useSelector((state) => ({
    currentUser: state.auth.user,
  }));

  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [sId, setSId] = useState(0);
  const [country, setCountry] = useState("Nigeria");

  const citie = cities.find((data) => data.stateId === sId);
  console.log(citie);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const address = {
      street: street,
      city: city,
      state: state,
      country: country,
    };

    const formData = {
      phone: phone,
      address: address,
    };
    console.log(formData, "form");

    setPhone("");
    setStreet("");
    setCity("");
    setState("");
    setCountry("Nigeria");
  };

  const handleStateChange = (e) => {
    setSId(e.target.value);
    console.log("state value", e.target.value);
    console.log(sId);
    console.log(state);
  };

  return (
    <Box w="80vw">
      <form onSubmit={(e) => handleFormSubmit(e)}>
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
            <Select onChange={handleStateChange} placeholder="State">
              {cities.map((state, stateId) => (
                <option
                  onChange={(e) => setState(e.target.value)}
                  key={stateId}
                  value={state.stateId}
                >
                  {state.state}
                </option>
              ))}
            </Select>
          </Box>
          <Box my={2}>
            <Text color="primary">City</Text>
            <Select
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            >
              {citie?.data?.map((ct) => (
                <option key={ct.id} value={ct.name}>
                  {ct.name}
                </option>
              ))}
            </Select>
            {/* <Input
              type="text"
              placeholder={currentUser?.city || "city"}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            /> */}
          </Box>
          <Box my={2}>
            <Text color="primary">Country</Text>
            <Select variant="filled">
              <option value="option1">Nigeria</option>
            </Select>
          </Box>
          <Box my={2}>
            <Input bgColor="primary" type="submit" value="Update account" />
          </Box>
        </FormControl>
      </form>

      {isLargeScreen ? (
        <TableContainer overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th> Country </Th>
                <Th>State</Th>
                <Th>City</Th>
                <Th>Street</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Nigeria</Td>
                <Td>Niger</Td>
                <Td>Minna</Td>
                <Td>Opposite CBN Quarters Tunga Minna</Td>
              </Tr>
              <Tr>
                <Td>Nigeria</Td>
                <Td>Niger</Td>
                <Td>Minna</Td>
                <Td>Opposite CBN Quarters Tunga Minna</Td>
              </Tr>
              <Tr>
                <Td>Nigeria</Td>
                <Td>Niger</Td>
                <Td>Minna</Td>
                <Td>Opposite CBN Quarters Tunga Minna</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <AddressCard />
      )}
    </Box>
  );
};

export default Address;
