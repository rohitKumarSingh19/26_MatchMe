const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Allow frontend domains
const allowedOrigins = [
  'http://localhost:5173',
  'https://match-me1.netlify.app',
  'https://matchme-ft37.netlify.app'
];

// ✅ Express CORS config
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working');
});

// ✅ Socket.IO server with proper CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// 💬 In-memory storage for typing users
const typingUsers = new Set();

// ✅ Socket.IO logic
io.on('connection', (socket) => {
  console.log('🟢 User connected');

  socket.on('send_message', (data) => {
    console.log('📨 New message:', data);
    io.emit('receive_message', data);
  });

  socket.on('typing', (username) => {
    typingUsers.add(username);
    io.emit('user_typing', Array.from(typingUsers));
  });

  socket.on('stop_typing', (username) => {
    typingUsers.delete(username);
    io.emit('stop_typing', username);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected');
  });
});

// ✅ API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/search', require('./routes/search.routes'));
app.use('/api/chat', require('./routes/chat.routes'));

// ✅ Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
