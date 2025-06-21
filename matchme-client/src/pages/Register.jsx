import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import API from '../services/api';
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast,
  Flex,
  Text,
  Link,
  Card,
  CardBody,
} from '@chakra-ui/react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', formData);
      toast({
        title: 'Registration successful.',
        description: 'You can now login to your account.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (err) {
      toast({
        title: 'Registration failed.',
        description: err.response?.data?.message || 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg="gray.100">
      <Card w={{ base: '90%', sm: '400px' }} p={6} boxShadow="lg">
        <CardBody>
          <Heading mb={6} textAlign="center" size="lg" color="blue.600">
            Create Your MatchMe Account
          </Heading>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" placeholder="Your full name" onChange={handleChange} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input name="email" type="email" placeholder="example@mail.com" onChange={handleChange} />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" placeholder="At least 6 characters" onChange={handleChange} />
            </FormControl>

            <Button colorScheme="blue" onClick={handleRegister}>
              Sign Up
            </Button>
          </Stack>

          <Text textAlign="center" mt={4}>
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="blue.500">
              Login
            </Link>
          </Text>
        </CardBody>
      </Card>
    </Flex>
  );
}
