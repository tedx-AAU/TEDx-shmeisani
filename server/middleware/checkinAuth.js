const jwt=require("jsonwebtoken");


module.exports=(req,res,next)=>{


    const token =
    req.headers.authorization?.split(" ")[1];


    if(!token){

        return res.status(401).json({
            message:"Unauthorized"
        });

    }


    try{

        const decoded =
        jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        if(decoded.role !== "checkin_staff"){

            return res.status(403).json({
                message:"Forbidden"
            });

        }


        req.staff=decoded;

        next();


    }
    catch(error){

        res.status(401).json({
            message:"Invalid token"
        });

    }

};