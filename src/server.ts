import app from './app'
import sequelize from './sequelize'
import dotenv from 'dotenv'
import Account from './models/Account'
import PhoneNumber from './models/PhoneNumber'
dotenv.config()

const port = 4000 || process.env.PORT

    app.listen(port, async () => {
        console.log(`[server]: Server is running at https://localhost:${port}`);
        await sequelize.addModels([Account, PhoneNumber])
        await sequelize.sync({ alter: true })
        console.log('Database connected')

    })
