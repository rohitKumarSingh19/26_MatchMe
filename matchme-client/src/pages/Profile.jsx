import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import API from '../services/api';
import { Box, Heading, Input, Button, Stack, Text } from '@chakra-ui/react';

export default function Profile() {
  const { user } = useAuth();
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
      console.error('Error loading profile',err);
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put('/profile/me', profile);
      alert('Profile updated!');
    } catch (err) {
      alert('Update failed',err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <Box p={6}>
      <Heading mb={4}>My Profile</Heading>
      <Stack spacing={3}>
        <Input name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
        <Input name="age" value={profile.age} onChange={handleChange} placeholder="Age" />
        <Input name="gender" value={profile.gender} onChange={handleChange} placeholder="Gender" />
        <Input name="location" value={profile.location} onChange={handleChange} placeholder="Location" />
        <Input name="hobbies" value={profile.hobbies} onChange={handleChange} placeholder="Hobbies" />
        <Button onClick={handleUpdate}>Update Profile</Button>
      </Stack>
    </Box>
  );
}
