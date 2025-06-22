
import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Input,
  Button,
  Stack,
  Text,
  Divider,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000', {
  withCredentials: true,
  transports: ['websocket'],
});

export default function Chat() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  // Handle new messages
  useEffect(() => {
    if (!user) return;

    // Receive message from server
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Cleanup listener
    return () => {
      socket.off('receive_message');
    };
  }, [user]);

  // Scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message
  const sendMessage = () => {
    if (message.trim() && user?.name) {
      const newMsg = {
        user: user.name,
        text: message.trim(),
        timestamp: new Date().toLocaleTimeString(),
      };

      // Emit to server
      socket.emit('send_message', newMsg);

      // Add to local message list
      //setMessages((prev) => [...prev, newMsg]);

      setMessage('');
    }
  };

  const bgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box p={6}>
      <Text fontWeight="bold" fontSize="xl" mb={4}>
        💬 Live Chat
      </Text>

      <Box
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        p={4}
        height="400px"
        overflowY="auto"
        bg={bgColor}
      >
        {messages.length === 0 ? (
          <Text color="gray.500">No messages yet. Start chatting!</Text>
        ) : (
          messages.map((msg, index) => (
            <Box key={index} mb={3}>
              <Flex justify="space-between">
                <Text fontWeight="semibold" color="blue.500">
                  {msg.user}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {msg.timestamp}
                </Text>
              </Flex>
              <Text>{msg.text}</Text>
              <Divider my={2} />
            </Box>
          ))
        )}
        <div ref={bottomRef} />
      </Box>

      <Stack direction="row" mt={4}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button colorScheme="blue" onClick={sendMessage}>
          Send
        </Button>
      </Stack>
    </Box>
  );
}
