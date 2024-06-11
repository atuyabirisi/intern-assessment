import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  return (
    <Box bg="brand.darkGreen" color="white" py={4} px={4} boxShadow="md" mb={{base:"4"}}>
      <Flex justify="space-between" align="center">
        <Text fontSize="xl">My Blog</Text>
      </Flex>
    </Box>
  );
};

export default Navbar;
