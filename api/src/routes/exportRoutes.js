import express from 'express';
import axios from "axios";
import multer from "multer";
import fs from "fs";

// Set up Multer to handle file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });




const pdfReportDirectory = 'C:/Users/Dell/Nodejs Dev/PlagCheck/api/pdf-reports';

if (!fs.existsSync(pdfReportDirectory)) {
  fs.mkdirSync(pdfReportDirectory);
}


const router = express.Router();

router.post('/:scanId/:exportId', async (req, res) => {
  try {
    // console.log("Hello HI called again");
    const body = req.body;
    const scanId = req.params["scanId"];
    const exportId = req.params["exportId"];
    console.log(exportId);
    const exportUrl = `https://api.copyleaks.com/v3/downloads/${scanId}/export/${exportId}`;
     console.log("authorization is:" , req.headers['authorization']);
    console.log('Request Headers:', req.headers);
    // console.log("CompletionWebhook" , body)
    const response=await axios.post(exportUrl, body, {
      headers: {
        'Content-Type': req.headers['content-type'],
        'Authorization':req.headers['authorization'],
      },
    })
    
      res.status(200).send(response.data);
 

    // // Handle successful export response
    // console.log(response);
  } catch (error) {
    // Handle export error
    console.error('Export API Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Error in Export API');
  }
});



router.post('/:export-id/completed', (req, res) => {
  try {
    const { exportId } = req.params;
    const body = req.body;
    console.log(body);
    const status = body.completed;
    if (status) {
      console.log(`Export completed for export ID: ${exportId}`);
      if (body.tasks[0].isHealthy)
        res.status(204).send("PDF report Generated Succesfully")
      else
        res.status(400).send("scan was completed with internal errors")
    }
    else {
      res.status(501).send(`Export failed for export ID : ${exportId}`)
    }
  } catch (error) {
    console.log("Error in completed webhook", error);
  }
})

router.post('/:export-id/pdf-report', upload.single('pdfReport'), (req, res) => {
  try {
    // Access the uploaded PDF report from req.file.buffer
     console.log(req);
    const pdfReportBuffer = req.file.buffer;
    // Generate a unique filename for the PDF report (you can adjust this logic)
    const uniqueFilename = `${Date.now()}_${req.file.originalname}`;

    // Define the full path to save the PDF report
    const pdfReportPath = `${pdfReportDirectory}/${uniqueFilename}`;

    // Write the PDF report buffer to the file
    fs.writeFileSync(pdfReportPath, pdfReportBuffer);

    console.log('PDF report saved:', pdfReportPath);
    res.status(204).json({ message: 'PDF report received' });
  } catch (error) {
    console.log('Error in PDF report route:', error);
    res.status(500).json({ error: 'internal server error' });
  }
});


export default router;