import {Request, Response, NextFunction} from 'express'
import { smsValidator } from '../schema/smsValidator'
import { inboundService } from '../services/inbound'
import { outboundService } from '../services/outbound'
import { ServiceResponse, sms } from '../types/inbound'

export default async function (req: Request, res: Response):Promise<Response<ServiceResponse>> {
    try {
        
        const data: sms = await smsValidator.validateAsync(req.body)
        const response = await outboundService(data, req.user)

        return res.status(200).send(response)
    } catch (err:any) {
        console.log(err)
        let message = ""
        let status = 500
        console.log(err)
        if (err.errors) {
            message = err.errors[Object.keys(err.errors)[0]].properties.message;
            status = 400;
        }
        return res.status(status).send({
            message,
            error: "unknown failure"
        })
    }
}