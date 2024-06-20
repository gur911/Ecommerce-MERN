import { Cart } from "../Models/Cart.models.js"

// add to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, title, price, qty, imgSrc } = req.body;
        const userId = req.user;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        // agr pehle s hi cart m h product to hme bs qunatity bdani h uski vo ham productId s dhundh k bda denge
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)
        if (itemIndex > -1) {
            cart.items[itemIndex].qty += qty;
            cart.items[itemIndex].price += price * qty;
        } else {
            // jo req.body s ara h vo hmne items array k andr puch krna h
            cart.items.push({ productId, title, price, qty, imgSrc });
        }
        await cart.save();
        res.json({ message: 'items added to cart', cart });
    } catch (error) {
        res.json({ message: error.message })
    }
}

// get user cart
export const userCart = async (req, res) => {
    try {
      const userId = req.user;
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.json({ message: "cart not found" }); // Return after sending response
      }
      return res.json({ message: "cart found", cart }); // Return after sending response
    } catch (error) {
      return res.json({ message: error.message }); // Return after sending response
    }
  }
  

// remove product from cart
export const removeProductFromCart = async (req,res) => {
    try {
        const productId = req.params.productId;
        const userId = req.user;
        let cart = await Cart.findOne({userId});
        if(!cart) res.json({message: "item not found"});
        cart.items = cart.items.filter((item)=>item.productId.toString()!== productId)
        await cart.save();
        res.json({message:"item founded and remove"});
    } catch (error) {
        res.json({message: error.message});
    }
}

// clear cart
export const clearCart = async (req,res) => {
    try {
        const userId = req.user;
        let cart = await Cart.findOne({userId});
        if(!cart){
            cart = new Cart({items:[]});
        }else{
            cart.items=[];
        }
        await cart.save();
        res.json({message:"cart has been cleared"});
    } catch (error) {
        res.json({message: error.message});
    }
}

// decrease quantity from Cart
export const decreaseProductQty = async (req, res) => {
    try {
        const { productId, qty} = req.body;
        const userId = req.user;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        // agr pehle s hi cart m h product to hme bs qunatity bdani h uski vo ham productId s dhundh k bda denge
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId)
        if (itemIndex > -1) {
            const item = cart.items[itemIndex];
            if(item.qty > qty){
                const pricePerUnit = item.price/item.qty;
                item.qty-=qty;
                item.price-=pricePerUnit*qty;
            }else {
                cart.items.splice(itemIndex,1)
            }
        } else {
            return res.json({message:'invalid product id'});
        }
        await cart.save();
        res.json({ message: 'items qty decreased', cart });
    } catch (error) {
        res.json({ message: error.message })
    }
}