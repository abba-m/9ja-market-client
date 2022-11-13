import { Box, Text } from "@chakra-ui/react";

const AddressCard = ({ addresses, handleDeleteAddress }) => {
  
  return (
    addresses?.length > 0 ? addresses?.map((address) => (
      <Box 
        mt="5" 
        key={address.userAddressId}
        onDoubleClick={() => 
          handleDeleteAddress(address.userAddressId)
        } 
        p={1} 
        shadow="lg"
      >
        <Box
          paddingX="2"
          py="0.5"
          borderBottom="0.01rem solid #474747"
          display="flex"
          justifyContent="space-between"
        >
          <Text fontSize="sm" fontWeight="semibold">Street</Text>
          <Text fontSize="sm">{address.street}</Text>
        </Box>
        <Box
          paddingX="2"
          py="0.5"
          borderBottom="0.01rem solid #474747"
          display="flex"
          justifyContent="space-between"
        >
          <Text fontSize="sm" fontWeight="semibold">City</Text>
          <Text fontSize="sm">{address.city}</Text>
        </Box>
        <Box
          paddingX="2"
          py="0.5"
          borderBottom="0.01rem solid #474747"
          display="flex"
          justifyContent="space-between"
        >
          <Text fontSize="sm" fontWeight="semibold">State</Text>
          <Text fontSize="sm">{address.state}</Text>
        </Box>
        <Box paddingX="2" py="0.5" display="flex" justifyContent="space-between">
          <Text fontWeight="semibold" fontSize="sm">Country</Text>
          <Text fontSize="sm">{address.country}</Text>
        </Box>
      </Box>
    )) : <Text fontSize="sm" mt={8}>You have not added any address yet.</Text>);
};

export default AddressCard;
