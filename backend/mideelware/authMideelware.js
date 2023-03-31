import pwd from 'jsonwebtoken';
const JWT ="kjabskdfbkasbdfkjbaskdbfb"



//create middelware 
export const verifyUser = (req , res , next)=>{
    const token =    req.headers['x-access-token'];
console.log(token)
    try {
   pwd.verify(token ,JWT )
    next();
        
    } catch (error) {
        
        console.log(error)
    }
 
}
// const token =    req.headers['x-access-token'];  