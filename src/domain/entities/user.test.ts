import { User } from './user';

describe('User Entity', () => {
    it('deve criar uma instância de User com id e nome', () => {
        const user = new User('1', 'Allan');

        expect(user).toBeInstanceOf(User);
        expect(user.getId()).toBe('1');
        expect(user.getName()).toBe('Allan');
    });

    it('deve lançar um erro se o nome ser um campo vazio', () => {
        expect(() => new User('1', '')).toThrow("O campo nome é obrigatório.");
    });

    it('deve lançar um erro se o ID ser um campo vazio', () => {
        expect(() => new User('', 'Allan')).toThrow("O ID do usuário não pode ser vazio.");
    });
});