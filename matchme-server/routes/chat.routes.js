const express=require('express');
const router=express.Router();
const {getAllMessages}=require('../controllers/chat.controller');
const {getChatHistory,saveMessage}=require('../controllers/chat.controller');
//GET/api/chat-> Fetch all chat messages
router.get('/',getChatHistory);
//POST /api/chat-> Save the new chat message(if needed)
router.post('/',saveMessage);
module.exports=router;