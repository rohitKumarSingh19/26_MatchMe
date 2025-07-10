import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" color="red.500">
        404 - Page Not Found
      </Heading>
      <Text mt={4} mb={6} color="gray.600">
        Oops! The page you're looking for does not exist.
      </Text>
      <Button colorScheme="blue" as={Link} to="/">
        Go Home
      </Button>
    </Box>
  );
}
