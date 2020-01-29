const data = require('./mock-data')
const LATENCY = 16

export function getAllMessages(cb) {
    setTimeout(() => {
        cb(data)
    }, LATENCY)
}

export function createMessage({ text, mData }, cb) {
    /*
      const timestamp = Date.now()
      const message = {
          text,
          timestamp,
          userName: mData.userName,
          forUser: mData.forUser,
      }
      setTimeout(function() {
          cb(message)
      }, LATENCY)
      */
}