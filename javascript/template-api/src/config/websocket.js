import sockeio from 'socket.io';
import redisDB from 'redis';

const client = redisDB.createClient();

function setRedis(key, value) {
  return new Promise((resolve, reject) => {
    client.set(key, value, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
async function addRedis(key, value) {
  await setRedis(key, value);
}

function getRedis(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}
async function viewRedis(key) {
  const viewRd = await getRedis(key);
  return viewRd;
}


function delRedis(key) {
  client.del(key);
}

let io;
function websocketConfig(server) {
  io = sockeio(server);

  io.on('connection', socket => {
    console.log(`Ws ID: ${socket.id} || config/websocket.js`);
  });
}

export { websocketConfig, io };
