import Account from "../../models/Account";

declare module 'express-serve-static-core' {
   interface Request {
       user?: Account;
   }
}