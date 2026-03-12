import { PropertyEntity } from "../../persistence/entities/property_entity";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../../persistence/entities/user_entity";
import { Property } from "../../../domain/entities/property";
import { TypeORMPropertyRepository } from "./typeorm_property_repository";

describe('TypeORMPropertyRepository', () => {
    let dataSource: DataSource;
    let propertyRepository: TypeORMPropertyRepository;
    let repository: Repository<PropertyEntity>;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'sqlite',
            database: ':memory:',
            dropSchema: true,
            entities: [UserEntity, PropertyEntity],
            synchronize: true,
            logging: false,
        });

        await dataSource.initialize();
        repository = dataSource.getRepository(PropertyEntity);
        propertyRepository = new TypeORMPropertyRepository(repository);

    });

    afterAll(async () => {
        await dataSource.destroy();
    })

    it('deve salvar uma propriedade com sucesso', async () => {
        const property = new Property('1', 'Casa', 'Casa grande com piscina', 6, 600);
        await propertyRepository.save(property);

        const savedProperty = await repository.findOne({ where: { id: '1' } });

        expect(savedProperty).not.toBeNull();
        expect(savedProperty?.id).toBe('1');
        expect(savedProperty?.title).toBe('Casa');
    });

    it('deve retornar uma propriedade com ID válido', async () => {
        const property = new Property('1', 'Casa', 'Casa grande com piscina', 6, 600);
        await propertyRepository.save(property);

        const savedProperty = await propertyRepository.findById('1');

        expect(savedProperty).not.toBeNull();
        expect(savedProperty?.getId()).toBe('1');
        expect(savedProperty?.getTitle()).toBe('Casa');
    });

    it('deve retornar NULL ao buscar uma propriedade inexistente', async () => {
        const savedProperty = await propertyRepository.findById('999');
        expect(savedProperty).toBeNull();
    });
});