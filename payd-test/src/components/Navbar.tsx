import React, { ChangeEvent } from 'react';
import { Box, Input, Flex, Text } from '@chakra-ui/react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <Box bg="brand.darkGreen" color="white" py={4} px={8} boxShadow="md">
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">My Blog</Text>
        <Input
          placeholder="Search posts..."
          value={searchQuery}
          onChange={onSearchChange}
          width="300px"
          borderColor="brand.amber"
          bg="white"
          color="black"
          _placeholder={{ color: 'gray.500' }}
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
