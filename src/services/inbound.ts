
import Redis from 'ioredis'

import PhoneNumber from '../models/PhoneNumber'
import Account from '../models/Account'
import {sms, ServiceResponse} from './../types/inbound'
import { env } from 'process'
import dotvenv from  'dotenv'

dotvenv.config()

export async function inboundService(data:sms, user: Account): Promise <ServiceResponse> {
    const client = new Redis()


    const number = await PhoneNumber.findOne({
        where:{number: data.to}
    })


    if (!number || number.account_id != user.id){
        return  {message: "", 
        error: "to parameter not found"}
    }
    if(data.text=="STOP" || data.text=="STOP\n" || data.text=="STOP\r\n" || data.text=="STOP\r" ){
        client.set(`${data.from}-${data.to}`, JSON.stringify({from: data.from, to: data.to}), 'EX', 144000)
        console.log('Done')
        
    }
    return {message: "inbound sms ok", error: ""}
}
