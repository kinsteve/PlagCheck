import {Router} from 'express';
import axios from 'axios';
const router = Router();


router.put('/url/:scanId' , async(req,res)=>{
    try {
         const scanId = req.params.scanId;
         console.log(req.body);
         console.log(req.headers['content-type'],req.headers['authorization']);
         const response = await axios.put(`https://api.copyleaks.com/v3/scans/submit/url/${scanId}`,req.body ,{headers: {
          'Content-Type': req.headers['content-type'],
          'Authorization':req.headers['authorization'],
         }});
         res.sendStatus(200);
         
    } catch (error) {
        console.log("Error in scan Routes" , error.response.data);
        res.sendStatus(500);
        
    }
})










export default router;
