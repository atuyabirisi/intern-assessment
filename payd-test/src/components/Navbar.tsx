import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  return (
    <Box bg="brand.darkGreen" color="white" py={4} px={8} boxShadow="md">
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">My Blog</Text>
      </Flex>
    </Box>
  );
};

export default Navbar;
