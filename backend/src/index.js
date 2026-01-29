// const express = require('express');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// app.use(cors()); // enables CORS for all origins
// app.use(express.json());  //middleware to parse json

// app.get("/fetchUserData",(req, res)=>{
//     res.status(200).json({
//         name:"John",
//         lastname: "Doe"
//     });
// })

// app.get("/refresh",(req, res)=>{
//     // res.status(200).json({
//     //     token:"aosidnisndidnasifwenpw"
//     // })
//      res.status(401).json({
//         message:"Unauthorized"
//     })
// })


// app.get("/getAbout", (req, res) => {
//     res.status(401).json({
//         message:"Unauthorized"
//     })
// });

// app.listen(PORT,()=>{
//     console.log(`Server running on http:localhost:${PORT}`);
// })