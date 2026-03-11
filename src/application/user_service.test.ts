import { User } from "../domain/entities/user";
import { UserService } from "./user_service";

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
    });

    it('deve retornar null quando um ID inválido for fornecido', async () => {
        const user = await userService.findUserById('invalid-id');

        expect(user).toBeNull();
    });

    it('deve retornar um usuário quando um ID válido for fornecido', async () => {
        const user = await userService.findUserById('123');

        expect(user).not.toBeNull();
        expect(user).toBeInstanceOf(User);
        expect(user?.getName()).toBe('John Doe');
    });

});