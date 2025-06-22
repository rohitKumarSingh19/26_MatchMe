// import { Box, Flex, Text, Link, Stack, Divider, IconButton } from '@chakra-ui/react';
// import { Link as RouterLink } from 'react-router-dom';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

// export default function Footer() {
//   return (
//     <Box bg="gray.800" color="gray.200" mt={10} py={6}>
//       <Divider borderColor="gray.600" mb={4} />
//       <Flex
//         direction={{ base: 'column', md: 'row' }}
//         justify="space-between"
//         align="center"
//         px={{ base: 6, md: 12 }}
//       >
//         <Text mb={{ base: 4, md: 0 }}>
//           &copy; {new Date().getFullYear()} MatchMe. All rights reserved.
//         </Text>

//         <Stack direction="row" spacing={6} align="center">
//           <Link as={RouterLink} to="/" _hover={{ color: 'pink.400' }}>
//             Home
//           </Link>
//           <Link as={RouterLink} to="/profile" _hover={{ color: 'pink.400' }}>
//             Profile
//           </Link>
//           <Link as={RouterLink} to="/search" _hover={{ color: 'pink.400' }}>
//             Search
//           </Link>
//           <Link as={RouterLink} to="/chat" _hover={{ color: 'pink.400' }}>
//             Chat
//           </Link>
//         </Stack>

//         <Stack direction="row" spacing={3} mt={{ base: 4, md: 0 }}>
//           <Link href="https://facebook.com" isExternal>
//             <IconButton
//               icon={<FaFacebook />}
//               variant="ghost"
//               colorScheme="whiteAlpha"
//               aria-label="Facebook"
//             />
//           </Link>
//           <Link href="https://twitter.com" isExternal>
//             <IconButton
//               icon={<FaTwitter />}
//               variant="ghost"
//               colorScheme="whiteAlpha"
//               aria-label="Twitter"
//             />
//           </Link>
//           <Link href="https://instagram.com" isExternal>
//             <IconButton
//               icon={<FaInstagram />}
//               variant="ghost"
//               colorScheme="whiteAlpha"
//               aria-label="Instagram"
//             />
//           </Link>
//           <Link href="https://linkedin.com" isExternal>
//             <IconButton
//               icon={<FaLinkedin />}
//               variant="ghost"
//               colorScheme="whiteAlpha"
//               aria-label="LinkedIn"
//             />
//           </Link>
//         </Stack>
//       </Flex>
//     </Box>
//   );
// }

import { Box, Flex, Text, Link, Stack, IconButton, Divider } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box bg="gray.900" color="gray.400" pt={10} pb={6} px={{ base: 4, md: 12 }}>
      <Divider borderColor="gray.700" mb={6} />

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        gap={4}
      >
        {/* Copyright Text */}
        <Text fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
          &copy; {new Date().getFullYear()} <b>MatchMe</b>. All rights reserved.
        </Text>

        {/* Navigation Links */}
        <Stack direction="row" spacing={6} fontSize="sm">
          <Link as={RouterLink} to="/" _hover={{ color: 'pink.400' }}>
            Home
          </Link>
          <Link as={RouterLink} to="/profile" _hover={{ color: 'pink.400' }}>
            Profile
          </Link>
          <Link as={RouterLink} to="/search" _hover={{ color: 'pink.400' }}>
            Search
          </Link>
          <Link as={RouterLink} to="/chat" _hover={{ color: 'pink.400' }}>
            Chat
          </Link>
        </Stack>

        {/* Social Media Icons */}
        <Stack direction="row" spacing={3}>
          <IconButton
            as="a"
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
            icon={<FaFacebook />}
            variant="ghost"
            colorScheme="gray"
            fontSize="lg"
          />
          <IconButton
            as="a"
            href="https://twitter.com"
            target="_blank"
            aria-label="Twitter"
            icon={<FaTwitter />}
            variant="ghost"
            colorScheme="gray"
            fontSize="lg"
          />
          <IconButton
            as="a"
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
            icon={<FaInstagram />}
            variant="ghost"
            colorScheme="gray"
            fontSize="lg"
          />
          <IconButton
            as="a"
            href="https://linkedin.com"
            target="_blank"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            variant="ghost"
            colorScheme="gray"
            fontSize="lg"
          />
        </Stack>
      </Flex>
    </Box>
  );
}
