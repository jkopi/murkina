import { Box, Container, Divider, Stack, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box as="footer" role="murkina-footer" width="full">
      <Divider py="4" />
      <Box py={{ base: '4', md: '8' }}>
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} - Murkina
        </Text>
      </Box>
    </Box>
  );
};
