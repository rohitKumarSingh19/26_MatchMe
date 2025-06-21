import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Stack,
  Heading,
  Flex,
  Link,
  Card,
  CardBody,
  Text
} from '@chakra-ui/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data);
      toast({
        title: 'Login successful.',
        description: `Welcome, ${res.data.name}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (err) {
      toast({
        title: 'Login failed.',
        description: err.response?.data?.message || 'Please check your credentials.',
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
            Welcome Back
          </Heading>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="example@mail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button colorScheme="blue" onClick={handleSubmit}>
              Login
            </Button>
          </Stack>

          <Text textAlign="center" mt={4}>
            New here?{' '}
            <Link as={RouterLink} to="/register" color="blue.500">
              Create an account
            </Link>
          </Text>
        </CardBody>
      </Card>
    </Flex>
  );
}
