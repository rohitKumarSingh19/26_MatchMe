// import { Box, Button, Flex, Link } from '@chakra-ui/react';
// import { Link as RouterLink } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// export default function Navbar() {
//   const { user, logout } = useAuth();
//   return (
//     <Flex p={4} bg="gray.100" justify="space-between" align="center">
//       <Link as={RouterLink} to="/">MatchMe</Link>
//       <Flex gap={4}>
//         {user ? (
//           <>
//             <Button onClick={logout}>Logout</Button>
//             <Link as={RouterLink} to="/profile">Profile</Link>
//           </>
//         ) : (
//           <>
//             <Link as={RouterLink} to="/login">Login</Link>
//             <Link as={RouterLink} to="/register">Register</Link>
//           </>
//         )}
//       </Flex>
//     </Flex>
//   );
// }

import {
  Box,
  Button,
  Flex,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
  Spacer,
  HStack
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.800', 'whiteAlpha.900');
  const hoverBg = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      p={4}
      bg={bg}
      color={color}
      align="center"
      justify="space-between"
      shadow="md"
      position="sticky"
      top={0}
      zIndex={100}
    >
      {/* Brand */}
      <Link
        as={RouterLink}
        to="/"
        fontWeight="bold"
        fontSize="xl"
        _hover={{ textDecoration: 'none', color: 'pink.400' }}
      >
        MatchMe ❤️
      </Link>

      <HStack spacing={4}>
        {/* Auth Links */}
        {user ? (
          <>
            <Link
              as={RouterLink}
              to="/profile"
              _hover={{ textDecoration: 'none', bg: hoverBg }}
              px={3}
              py={1}
              borderRadius="md"
            >
              Profile
            </Link>
            <Button colorScheme="pink" size="sm" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link
              as={RouterLink}
              to="/login"
              _hover={{ textDecoration: 'none', bg: hoverBg }}
              px={3}
              py={1}
              borderRadius="md"
            >
              Login
            </Link>
            <Link
              as={RouterLink}
              to="/register"
              _hover={{ textDecoration: 'none', bg: hoverBg }}
              px={3}
              py={1}
              borderRadius="md"
            >
              Register
            </Link>
          </>
        )}

        {/* Dark Mode Toggle */}
        <IconButton
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          aria-label="Toggle Dark Mode"
          variant="ghost"
        />
      </HStack>
    </Flex>
  );
}
