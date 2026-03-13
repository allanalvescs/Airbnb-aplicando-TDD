import { User } from "../../domain/entities/user";
import { UserService } from "./user_service";
import { FakeUserRepository } from "../../infrastructure/repositories/fakes/fake_user_repositoty";

describe('UserService', () => {
    let userService: UserService;
    let fakeUserRepository: FakeUserRepository;

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        userService = new UserService(fakeUserRepository);
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

    it('deve salvar um novo usuário com sucesso, usando um repositório fake e buscando novamente', async () => {
        const newUser = new User('789', 'Test User');
        await fakeUserRepository.save(newUser);

        const user = await userService.findUserById('789');

        expect(user).not.toBeNull();
        expect(user).toBeInstanceOf(User);
        expect(user?.getName()).toBe('Test User');
    });

    it('deve criar um novo usuário usando o método createUser e buscar novamente', async () => {
        const createUserDTO = { name: 'New User' };
        
        const createdUser = await userService.createUser(createUserDTO);

        expect(createdUser).not.toBeNull();
        expect(createdUser).toBeInstanceOf(User);

        const foundUser = await userService.findUserById(createdUser.getId());

        expect(foundUser).not.toBeNull();
        expect(foundUser).toBeInstanceOf(User);
        expect(foundUser?.getName()).toBe('New User');
    });
});