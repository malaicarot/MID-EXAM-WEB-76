import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
function verifyToken(req, res, next) {
  const token = req.header('access-token');
   if(!token){
      return response.status(401).send({message: 'Access Denied'});
   }

   try {
      jwt.verify(token, process.env.SECRET_KEY);
      next();
      
   } catch (error) {

      return response.status(400).send({message: 'Invalid Token'});
   }
}


export default verifyToken


