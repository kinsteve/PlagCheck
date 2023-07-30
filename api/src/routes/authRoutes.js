import { Router } from 'express';
import axios from 'axios';
const router = Router();

router.post('/login', async(req,res)=>{
    try {
        const {email , key} = req.body;
        const response = await axios.post("https://id.copyleaks.com/v3/account/login/api",{
          email : email,
          key : key
        });
        res.json(response.data.access_token);
      } catch (error) {
        console.error('Error logging in:', error.message);
        res.sendStatus(500);
      }
})

export default router;