
export const getUser = (req,res)=>{
    res.json({user: req.user});
}