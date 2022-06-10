import {Request, Response, NextFunction} from 'express'
import { smsValidator } from '../schema/smsValidator'
import { inboundService } from '../services/inbound'
import { ServiceResponse, sms } from '../types/inbound'


export default async function (req: Request, res: Response): Promise<Response<ServiceResponse>> {
    try {
        const data: sms = await smsValidator.validateAsync(req.body)
        const response = await inboundService(data, req.user)

        let status = 200

        if(response.error) status = 400
        
        return res.status(status).send(response)
    } catch (err: any) {
        let error = "unknown failure"
        let status = 500
        console.log(err)
        if(err.name === "ValidationError"){
            error = err.details[0].message;
            status = 400;
        }
        return res.status(status).send({
            message: "",
            error
        })
    }
}