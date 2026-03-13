export class User {
    private readonly id: string;
    private readonly name: string;
    constructor(id: string, name: string) {
        if (name.trim() === '') {
            throw new Error("O campo nome é obrigatório.");
        }

        if(!id) {
            throw new Error("O ID do usuário não pode ser vazio.");
        }

        this.id = id;
        this.name = name;

    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
}