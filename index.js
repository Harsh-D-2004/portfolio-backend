import express from 'express';
import axios from 'axios';
import mongoose from 'mongoose';
import user_info from './user_info.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});


const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:8080' , 'https://www.harshdoshi.fyi/'] }));
app.use(express.json());
app.set('trust proxy', true); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/visitor-info', async (req, res) => {
  try {
    const ip = req.ip || req.socket.remoteAddress;

    const ipToUse = (ip === '::1' || ip.startsWith('::ffff:127')) ? '' : ip;

    const response = await axios.get(`https://ipapi.co/${ipToUse}/json/`);
    console.log(response.data);
    const user = new user_info({
      ip: ipToUse || 'Public IP auto-detected',
      dateTime : new Date().toLocaleString(),
      ip2 : response.data.ip,
      network : response.data.network,
      city : response.data.city,
      region : response.data.region,
      country : response.data.country,
      latitude : response.data.latitude,
      longitude : response.data.longitude,
      asn : response.data.asn,
      org : response.data.org,
    });
    await user.save();
    res.json(user).status(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch IP data' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});