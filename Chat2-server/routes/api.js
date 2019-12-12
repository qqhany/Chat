const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '316976',
  key: '85d5d463074afae9e75f',
  secret: '98ed135d738d12b77fdf',
});

let messages = [];

router.get('/', (req, res) => {
  res.send('all good');
});

router.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

module.exports = router;