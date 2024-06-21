import express from "express"
import mongoose from "mongoose";
import bodyParser from "express"
import userRouter from './Routes/User.routes.js'
import productRouter from './Routes/Product.routes.js'
import cartRouter from './Routes/Cart.routes.js'
import addressRouter from './Routes/Address.routes.js'
import paymentRouter from './Routes/Payment.routes.js'
import cors from 'cors'

const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: true,
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

// home testing route
app.get('/',(req,res)=>{
    res.json({message:'this is home route'});
})
// user Router
app.use('/api/user',userRouter)

// product router
app.use('/api/product',productRouter);

// cart router 
app.use('/api/cart',cartRouter);

// address router 
app.use('/api/address',addressRouter);

// payment router
app.use('/api/payment',paymentRouter);

mongoose.connect("mongodb+srv://gursewaksinghynr73:fece1JKOfX4tT4jd@cluster0.maplv05.mongodb.net/",{
    dbName:"ECOMMERce-MERN"
}).then(()=>console.log("mongodb connected succesfully")).catch((err)=>console.log(err));

const port = 1000;

app.listen(port,()=>console.log(`server is running on port ${port}`));
