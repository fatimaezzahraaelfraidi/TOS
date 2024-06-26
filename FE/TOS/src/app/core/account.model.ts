import { User } from "./user.model"

export interface Account {
    account_id: string
    user_name: string,
    created_at: Date,
    role: string,
    user: User | null
}