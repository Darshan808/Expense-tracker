import Transaction from "../models/transaction.js";

export const getTransactions = async (req,res)=>{
    const transactions = await Transaction.find({user_id: req.user._id}).sort({createdAt:-1});
    const demo =  await Transaction.aggregate([
        {
            $match: {user_id: req.user._id}
        },
        {
            $group: {
                _id: {$month: '$date'},
                // transactions: {$push: {amount: '$amount', discription: '$discription', catagory: '$catagory', date: '$date', _id: '$_id'}},
                totalExpenses: {$sum: '$amount'},
            },
        },
    ]).sort({_id:1})

    res.json({data: demo, transactionsTable: transactions});
}
export const setTransaction = async (req,res)=>{
    const {amount,discription,date,catagory,createdAt} = req.body;
    const transaction = new Transaction({
        amount,discription,date,catagory,createdAt,
        user_id: req.user._id
    })
    await transaction.save();
    res.json({message:'new transaction saved'});
}

export const deleteTransaction = async (req,res)=>{
    await Transaction.findOneAndDelete({_id: req.params.id});
    res.json({message:'transaction deleted!'});
}

export const updateTransaction = async (req,res)=>{
    const {amount,discription,date,catagory} = req.body;
    await Transaction.findOneAndUpdate({_id: req.params.id},{amount,discription,date,catagory});
    res.json({message: 'transaction updated'});
}