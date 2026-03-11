import { User } from "../domain/entities/user";

export class UserService {
    async findUserById(id: string): Promise<User | null> {
        return null;
    }
}