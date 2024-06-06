import express from "express";
import { TransactionService } from "../services/transaction.service";

const TransactionRouter = express.Router();
TransactionRouter.get('/',  async(req, res) => {
    if(! (req?.body?.startDate || req.query.startDate)) return res.status(400).json({
        message:' Invalid Start Date'
    })
    if(! (req?.body?.endDate || req.query.endDate))return res.status(400).json({
        message:' Invalid End Date'
    })
    if((req?.body?.startDate || req.query.startDate) > (req?.body?.endDate || req.query.endDate) ){
        return res.status(400).json({
            message:'Start Date should be less than End Date!'
        })
    }
    return res.send(await TransactionService.getTransactionsByDate(req?.body?.startDate || req.query.startDate, req?.body?.endDate || req.query.endDate));
});
TransactionRouter.post('/',  async(req, res) => {
    console.log(req.body);
    if(! req?.body) return res.status(400).json({
        message:' Invalid payload'
    })
    await TransactionService.saveTransaction(req?.body).then(result => res.send(result) ).catch(err => res.status(500).send(err));
    return res;
});
TransactionRouter.put('/', async(req, res) => {
    await TransactionService.updateTransaction(req.body).then(result => res.send(result) ).catch(err => res.status(500).send(err));
    return res;
})
export default TransactionRouter;
