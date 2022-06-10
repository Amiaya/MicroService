import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
dotenv.config()


const { DATABASE_HOST,DATABASE,DATABASE_PASSWORD,DATABASE_USERNAME, DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL||"", {
    dialect:'postgres',
    logging:false,
}
);

export default sequelize; 
