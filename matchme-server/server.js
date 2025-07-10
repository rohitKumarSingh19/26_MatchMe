// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const http = require('http');
// const { Server } = require('socket.io');
// dotenv.config();
// const app = express();
// const server = http.createServer(app);
// app.get("/",(req,res)=>{
//   res.send('API is working')
// });
// //const chat=require('./routes/chat.routes')
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));
// app.use(express.json());

// // 💬 In-memory storage for typing users
// const typingUsers = new Set();

// // ✅ SOCKET.IO Logic
// io.on('connection', (socket) => {
//   console.log('🟢 User connected');

//   // Broadcast incoming message
//   socket.on('send_message', (data) => {
//     console.log('📨 New message:', data);//debug
//     io.emit('receive_message', data);
//   });

//   // Handle typing status
//   socket.on('typing', (username) => {
//     typingUsers.add(username);
//     io.emit('user_typing', Array.from(typingUsers));
//   });

//   socket.on('stop_typing', (username) => {
//     typingUsers.delete(username);
//     io.emit('stop_typing', username);
//   });

//   // On disconnect, remove from typing list
//   socket.on('disconnect', () => {
//     console.log('🔴 User disconnected');
//   });
// });

// // ✅ API Routes
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/profile', require('./routes/profile.routes'));
// app.use('/api/search', require('./routes/search.routes'));
// app.use('/api/chat',require('./routes/chat.routes'));

// // ✅ Connect to MongoDB & Start Server
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     server.listen(process.env.PORT, () => {
//       console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
//     });
//   })
//   .catch(err => console.error('❌ MongoDB connection failed:', err));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ ALLOWED ORIGINS
const allowedOrigins = [
  'http://localhost:5173',
  'https://matchme-ft37.netlify.app' // ✅ Your Netlify frontend URL
];

// ✅ Express CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for: ' + origin));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('API is working');
});

// ✅ Socket.IO CORS Setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// 💬 Typing Users Set
const typingUsers = new Set();

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

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
