import { Products } from "../Models/Product.models.js"

// add product
export const addProduct = async (req, res) => {
    const { title, description, price, category, qty, imgSrc } = req.body;
    try {
        let product = await Products.create({
            title, description, price, category, qty, imgSrc
        })
        res.json({message: "product added successfully",product});
    } catch (error) {
        res.json({message:error.message});
    }
}

// get products 
export const getProducts = async(req,res)=>{
    try {
        let products = await Products.find().sort({createdAt:-1});
        res.json({message:"product added successfully",products});
    } catch (error) {
        res.json({message:error.message});
    }
}

// find product by id
export const getProductById = async(req,res)=>{
    try {
        const id = req.params.id;// ye req m id wha jo route k aage likhi hui h vhi ati h agr route k aage jot likha hotato yaha jot likhna pdta 
        let product = await Products.findById(id);
        if(!product) return res.json({message:'Invalid Id'});
        res.json({message:"specific product",product});
    } catch (error) {
        res.json({message:error.message});
    }
}

// update product by id
export const updateProductById = async(req,res)=>{
    try {
        const id = req.params.id;// ye req m id wha jo route k aage likhi hui h vhi ati h agr route k aage jot likha hotato yaha jot likhna pdta 
        let product = await Products.findByIdAndUpdate(id,req.body,{new:true});
        if(!product) return res.json({message:'Invalid Id'});
        res.json({message:"product has been updated",product});
    } catch (error) {
        res.json({message:error.message});
    }
}

// delete product by id
export const deleteProductById = async(req,res)=>{
    try {
        const id = req.params.id;// ye req m id wha jo route k aage likhi hui h vhi ati h agr route k aage jot likha hotato yaha jot likhna pdta 
        let product = await Products.findByIdAndDelete(id);
        if(!product) return res.json({message:'Invalid Id'});
        res.json({message:"product has been deleted",product});
    } catch (error) {
        res.json({message:error.message});
    }
}