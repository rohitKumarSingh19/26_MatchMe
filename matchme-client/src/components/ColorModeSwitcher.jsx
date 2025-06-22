import { IconButton, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
export default function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
      aria-label="Toggle dark mode"
      variant="ghost"
      size="md"
    />
  );
}