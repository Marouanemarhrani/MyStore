import  express  from "express";
import {registerController, 
        loginController,  
        updateProfileController} from "../controllers/userController.js";
import { requireSignIn, 
         isAdmin } from "../middlewares/authMiddleware.js";


//router object 
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || POST 
router.post('/login', loginController);

//update profile
router.put('/profile', requireSignIn, updateProfileController);


export default router;