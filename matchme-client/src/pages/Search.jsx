import { useEffect, useState } from 'react';
import API from '../services/api';
import { Box, Heading, Input, Stack, Button, Text } from '@chakra-ui/react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await API.get(`/search?query=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error('Search failed',err);
    }
  };

  return (
    <Box p={6}>
      <Heading mb={4}>Search Users</Heading>
      <Stack spacing={3}>
        <Input
          placeholder="Search by name, location, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Stack>

      <Box mt={6}>
        {results.map((user) => (
          <Box key={user._id} p={4} border="1px" borderRadius="md" mt={4}>
            <Text><strong>Name:</strong> {user.name}</Text>
            <Text><strong>Location:</strong> {user.location}</Text>
            <Text><strong>Age:</strong> {user.age}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
