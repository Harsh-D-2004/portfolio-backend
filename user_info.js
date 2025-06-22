import {Schema , model} from 'mongoose'

const user_info_schema = new Schema({
  ip: {
    type: String,
  },
  dateTime: {
    type: String,
  },
  ip2: {
    type: String,
  },
  network: {
    type: String,
  },
  city: {
    type: String,
  },
  region: {
    type: String,
  },
  country: {
    type: String,
  },
  longitude: {
    type: Number,
  },
  latitude: {
    type: Number,
  },
  asn: {
    type: String,
  },
  org: {
    type: String,
  },
});

export default model('user_info', user_info_schema);