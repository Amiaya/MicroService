import {Table, Column, HasMany, Model} from 'sequelize-typescript'
import PhoneNumber from './PhoneNumber'

@Table({
    timestamps: false,
    tableName: 'account'
})

export default class Account extends Model<Account> {
    static authenticate(arg0: { username: string; password: string }) {
        throw new Error('Method not implemented.')
    }
    @Column
    public auth_id!: string

    @Column
    public username!: string

    @HasMany(() => PhoneNumber)
    numbers!: PhoneNumber[]
}