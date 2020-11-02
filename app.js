const express = require('express');
const auth = require('./wechat/auth.js')

const app = express()

app.use(auth())
app.listen(3000, () => console.log('server is running at 127.0.0.1:3000'))