import { Box, Text } from "@chakra-ui/react";

const AddressCard = () => {
  const addressses = [
    {
      street: "Opposite CBN Quarters Tunga Minna",
      city: "Minna",
      state: "Niger",
      country: "Nigeria",
    },
    {
      street: "Opposite CBN Quarters Tunga Minna",
      city: "Minna",
      state: "Niger",
      country: "Nigeria",
    },
    {
      street: "Opposite CBN Quarters Tunga Minna",
      city: "Minna",
      state: "Niger",
      country: "Nigeria",
    },
  ];
  return addressses.map((address) => (
    <Box mt="5" boxShadow="base">
      <Box
        paddingX="2"
        borderBottom="0.01rem solid #474747"
        display="flex"
        justifyContent="space-between"
      >
        <Text as="b">STREET</Text>
        <Text fontSize="sm">{address.street}</Text>
      </Box>
      <Box
        paddingX="2"
        borderBottom="0.01rem solid #474747"
        display="flex"
        justifyContent="space-between"
      >
        <Text as="b">CITY</Text>
        <Text fontSize="sm">{address.city}</Text>
      </Box>
      <Box
        paddingX="2"
        borderBottom="0.01rem solid #474747"
        display="flex"
        justifyContent="space-between"
      >
        <Text as="b">STATE</Text>
        <Text fontSize="sm">{address.state}</Text>
      </Box>
      <Box paddingX="2" display="flex" justifyContent="space-between">
        <Text as="b">COUNTRY</Text>
        <Text fontSize="sm">{address.country}</Text>
      </Box>
    </Box>
  ));
};

export default AddressCard;
