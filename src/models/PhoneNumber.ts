import {Table, Column, BelongsTo,ForeignKey, Model} from 'sequelize-typescript'
import Account from './Account'

@Table({
    tableName: "phone_number",
    timestamps: false
})

export default class PhoneNumber extends Model<PhoneNumber>{
    @Column
    public number!: string

    @ForeignKey(() => Account)
    @Column
    account_id!: number

    @BelongsTo(() => Account)
    account!: Account


}
