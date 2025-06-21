import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Box, Button, Input, Stack, Heading } from '@chakra-ui/react';
export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed',err);
    }
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Register</Heading>
      <Stack spacing={3}>
        <Input placeholder="Name" name="name" onChange={handleChange} />
        <Input placeholder="Email" name="email" onChange={handleChange} />
        <Input placeholder="Password" name="password" type="password" onChange={handleChange} />
        <Button onClick={handleRegister}>Sign Up</Button>
      </Stack>
    </Box>
  );
}
