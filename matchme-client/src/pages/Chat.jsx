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
// import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import API from '../services/api';
import socket from '../socket';
export default function Chat() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);
   // ✅ Debug socket connection
  useEffect(() => {
    console.log("🧠 Socket Connected:", socket.connected);
    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });
  }, []);

  //debug connection
  useEffect(() => {
  console.log("🧠 Initial Socket State:", socket.connected);

  socket.on("connect", () => {
    console.log("✅ Connected to socket server:", socket.id);
  });

  socket.on("disconnect", () => {
    console.warn("❌ Disconnected from socket server");
  });

  socket.on("connect_error", (err) => {
    console.error("🚨 Connection error:", err.message);
  });
}, []);


  // Fetch latest messages on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get('/chat');
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to load chat history', err);
      }
    };

    if (user) fetchMessages();
  }, [user]);

  // Socket: receive new messages and typing updates
  useEffect(() => {
    if (!user) return;

    socket.on('receive_message', (msg) => {
      console.log("📥 Message received:", msg);//debug
      setMessages((prev) => [...prev, msg]);
    });
    // return()=>{
    //   socket.off('receive_message')
    // }

    socket.on('user_typing', (users) => {
      setTypingUsers(users.filter((u) => u !== user.name));
    });

    socket.on('stop_typing', (username) => {
      setTypingUsers((prev) => prev.filter((u) => u !== username));
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_typing');
      socket.off('stop_typing');
    };
  }, [user]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTyping = () => {
    if (!user?.name) return;

    socket.emit('typing', user.name);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop_typing', user.name);
    }, 1000);
  };

  const sendMessage = async() => {
    if (message.trim() && user?.name) {
      const newMsg = {
        user: user.name,
        text: message.trim(),
        timestamp: new Date().toLocaleTimeString()
      };

      socket.emit('send_message', newMsg);//emit all connected clients
      try{
        await API.post('/chat',newMsg);//save to DB
      }catch(err){
        console.error('Failed to save message',err);
      }
      socket.emit('stop_typing',user.name);
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
        {typingUsers.length > 0 && (
          <Text fontSize="sm" color="gray.500" mb={2}>
            {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...
          </Text>
        )}

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
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
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
