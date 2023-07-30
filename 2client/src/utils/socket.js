import io from 'socket.io-client';

let socket;

export const initializeSocket = (ngrokPublicURL) => {
  socket = io(ngrokPublicURL);
  socket.on('scanResult', (data) => {
    // Handle the received data when scan status changes
    console.log('Received scan result:', data.scanResult);
    // Do additional processing or update the UI based on the scan status
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};