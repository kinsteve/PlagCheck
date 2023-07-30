import express from 'express';


const router = express.Router();

const webhookRoute = (io) => {
  router.post("/:status/:scanId", async (req, res) => {
    try {
      const status = req.params.status;
      const scanId = req.params.scanId;
      // Check if the status is 'completed'
      if (status === 'completed') {
        // Access the scan result in the request body
        const scanResult = req.body;
        console.log('Your Scan status is:', status);
        console.log('Scan ID:', scanId);
        console.log(scanResult);
        // Emit the scan result to the frontend using Socket.IO
        io.emit('scanResult', { scanId, scanResult });
      } else {
        // Handle other status types if needed
        console.log('Your Scan status is:', status);
        console.log('Scan ID:', scanId);
      }
      res.sendStatus(200); // Respond with a success status
    } catch (error) {
      console.log(error);
      res.sendStatus(500); // Respond with an error status
    }
  });

  return router;
};

export default webhookRoute;
