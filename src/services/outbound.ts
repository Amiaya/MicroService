import Redis from 'ioredis'
import PhoneNumber from '../models/PhoneNumber'
import Account from '../models/Account'
import {sms, ServiceResponse} from './../types/inbound'
import dotvenv from  'dotenv'

dotvenv.config()

export async function outboundService(data:sms, user:Account): Promise<ServiceResponse>{
    const client = new Redis()
    const number = await PhoneNumber.findOne({
        where:{number: data.from }
        })
    
    const value = await client.get(`${data.from}-${data.to}`)
    console.log(value)
    if(value){
        data = JSON.parse(value)
        return {message: "", error: `sms from ${data.from} to ${data.to} blocked by STOP request`}

    }

    if(!number || number.account_id != user.id){
        return {
            message:"",
            error: "from parameter not found"
        }
    }
    return {message: "outbound sms ok", error: ""} 
}