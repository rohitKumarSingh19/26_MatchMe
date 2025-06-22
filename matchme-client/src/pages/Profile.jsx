import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import {
  Box,
  Heading,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  useToast,
  Flex,
  Card,
  CardBody,
  Text
} from '@chakra-ui/react';

export default function Profile() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate(); // ✅ Hook to navigate

  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    hobbies: ''
  });

  const fetchProfile = async () => {
    try {
      const res = await API.get('/profile/me');
      setProfile(res.data);
    } catch (err) {
      console.error('Error loading profile', err);
      toast({
        title: 'Error',
        description: 'Failed to load profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put('/profile/me', profile);
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // ✅ Redirect after short delay (to allow toast to show)
      setTimeout(() => {
        navigate('/search'); // 👈 Change this path to wherever you want
      }, 2200);
    } catch (err) {
      toast({
        title: 'Update Failed',
        description: err.response?.data?.message || 'Could not update profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg="gray.100">
      <Card w={{ base: '90%', sm: '500px' }} p={6} boxShadow="lg">
        <CardBody>
          <Heading mb={6} textAlign="center" size="lg" color="blue.600">
            My Profile
          </Heading>

          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={profile.name} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Age</FormLabel>
              <Input name="age" value={profile.age} onChange={handleChange} type="number" />
            </FormControl>

            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Input name="gender" value={profile.gender} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input name="location" value={profile.location} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel>Hobbies</FormLabel>
              <Input name="hobbies" value={profile.hobbies} onChange={handleChange} />
            </FormControl>

            <Button colorScheme="blue" onClick={handleUpdate}>
              Update Profile
            </Button>
          </Stack>

          <Text mt={6} fontSize="sm" color="gray.500" textAlign="center">
            Keep your profile up-to-date for better matches!
          </Text>
        </CardBody>
      </Card>
    </Flex>
  );
}
