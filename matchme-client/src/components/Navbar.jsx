import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <Flex p={4} bg="gray.100" justify="space-between" align="center">
      <Link as={RouterLink} to="/">MatchMe</Link>
      <Flex gap={4}>
        {user ? (
          <>
            <Button onClick={logout}>Logout</Button>
            <Link as={RouterLink} to="/profile">Profile</Link>
          </>
        ) : (
          <>
            <Link as={RouterLink} to="/login">Login</Link>
            <Link as={RouterLink} to="/register">Register</Link>
          </>
        )}
      </Flex>
    </Flex>
  );
}
