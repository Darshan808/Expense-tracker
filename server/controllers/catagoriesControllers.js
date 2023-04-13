import User from "../models/User.js";

export const addCatagory = async (req,res)=>{
    const newCatagory= req.body;
    await User.updateOne({_id:req.user._id},{$push: {catagories: newCatagory}});
    const user = await User.findOne({_id:req.user._id});
    res.json({newCatagories: user.catagories});  
}
export const updateCatagory = async (req,res)=>{
    const {label,icon}= req.body;
    const newCatagories = req.user.catagories.map(catagory=>{
        if(catagory._id == req.params.id){
            return {label:label,icon:icon,_id:catagory._id};
        }
        return catagory;
    })
    await User.updateOne({ _id: req.user._id },{$set: {categories: newCatagories}});
    res.json({newCatagories: newCatagories}); 
}
export const deleteCatagory = async (req,res)=>{
    await User.updateOne({_id:req.user._id},{$pull: {catagories: {_id:req.params.id}}});
    const user = await User.findOne({_id:req.user._id});
    res.json({newCatagories: user.catagories}); 
}