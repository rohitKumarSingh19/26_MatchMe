// import {
//   Box,
//   Button,
//   Flex,
//   Link,
//   IconButton,
//   useColorMode,
//   useColorModeValue,
//   Spacer,
//   HStack
// } from '@chakra-ui/react';
// import { Link as RouterLink } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import { FaMoon, FaSun } from 'react-icons/fa';

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const { colorMode, toggleColorMode } = useColorMode();

//   const bg = useColorModeValue('gray.100', 'gray.800');
//   const color = useColorModeValue('gray.800', 'whiteAlpha.900');
//   const hoverBg = useColorModeValue('gray.200', 'gray.700');

//   return (
//     <Flex
//       p={4}
//       bg={bg}
//       color={color}
//       align="center"
//       justify="space-between"
//       shadow="md"
//       position="sticky"
//       top={0}
//       zIndex={100}
//     >
//       {/* Brand */}
//       <Link
//         as={RouterLink}
//         to="/"
//         fontWeight="bold"
//         fontSize="xl"
//         _hover={{ textDecoration: 'none', color: 'pink.400' }}
//       >
//         MatchMe ❤️
//       </Link>

//       <HStack spacing={4}>
//         {/* Auth Links */}
//         {user ? (
//           <>
//             <Link
//               as={RouterLink}
//               to="/profile"
//               _hover={{ textDecoration: 'none', bg: hoverBg }}
//               px={3}
//               py={1}
//               borderRadius="md"
//             >
//               Profile
//             </Link>
//             <Button colorScheme="pink" size="sm" onClick={logout}>
//               Logout
//             </Button>
//           </>
//         ) : (
//           <>
//             <Link
//               as={RouterLink}
//               to="/login"
//               _hover={{ textDecoration: 'none', bg: hoverBg }}
//               px={3}
//               py={1}
//               borderRadius="md"
//             >
//               Login
//             </Link>
//             <Link
//               as={RouterLink}
//               to="/register"
//               _hover={{ textDecoration: 'none', bg: hoverBg }}
//               px={3}
//               py={1}
//               borderRadius="md"
//             >
//               Register
//             </Link>
//           </>
//         )}

//         {/* Dark Mode Toggle */}
//         <IconButton
//           icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
//           onClick={toggleColorMode}
//           aria-label="Toggle Dark Mode"
//           variant="ghost"
//         />
//       </HStack>
//     </Flex>
//   );
// }

import {
  Box,
  Flex,
  Button,
  Text,
  Spacer,
  Link,
  useColorMode,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      p={4}
      bg={useColorModeValue('gray.800', 'gray.900')}
      color="white"
      shadow="md"
    >
      {/* Brand */}
       <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
      <Text fontSize="xl" fontWeight="bold" color="pink.400">
        MatchMe ❤️
      </Text>
      </Link>

      <Spacer />

      {/* Links */}
      <Flex gap={4} align="center">
        {user ? (
          <>
            <Text fontSize="md" fontWeight="semibold">
              Hi, {user.name.split(' ')[0]}
            </Text>
            <Link as={RouterLink} to="/profile">
              Profile
            </Link>
            <Link as={RouterLink} to="/search">
              Search
            </Link>
            <Link as={RouterLink} to="/chat">
              Chat
            </Link>
            <Button size="sm" colorScheme="pink" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link as={RouterLink} to="/login">
              Login
            </Link>
            <Link as={RouterLink} to="/register">
              Register
            </Link>
          </>
        )}
        {/* Dark Mode Toggle */}
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
          size="sm"
        />
      </Flex>
    </Flex>
  );
}
