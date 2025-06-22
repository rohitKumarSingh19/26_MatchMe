import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Home() {
  return (
    <Box
      minH="100vh"
      bgImage="linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/banner.jpg')" // blended gradient + image
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        color="white"
        textAlign="center"
        maxW="2xl"
        px={6}
      >
        <VStack spacing={6}>
          <Heading
            size={{ base: '2xl', md: '3xl' }}
            fontWeight="bold"
            textShadow="1px 1px 10px rgba(0,0,0,0.6)"
          >
            Welcome to MatchMe ❤️
          </Heading>

          <Text
            fontSize={{ base: 'md', md: 'xl' }}
            textShadow="1px 1px 8px rgba(0,0,0,0.4)"
          >
            Find your perfect match based on shared values, interests, and compatibility. Start your journey today!
          </Text>

          <Button
            as={RouterLink}
            to="/register"
            colorScheme="pink"
            size="lg"
            px={8}
            _hover={{ bg: 'pink.400' }}
            shadow="md"
          >
            Get Started
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
