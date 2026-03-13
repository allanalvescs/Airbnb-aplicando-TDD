import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe('PropertyMapper', () => {

    it('deve converter PropertyEntity em Property corretamente', () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '1';
        propertyEntity.title = 'Casa';
        propertyEntity.description = 'Casa grande com piscina';
        propertyEntity.maxGuests = 4;
        propertyEntity.basePricePerNight = 100;

        const property = PropertyMapper.toDomain(propertyEntity);

        expect(property).toBeInstanceOf(Property);
        expect(property.getId()).toBe('1');
        expect(property.getTitle()).toBe('Casa');
        expect(property.getDescription()).toBe('Casa grande com piscina');
        expect(property.getMaxGuests()).toBe(4);
        expect(property.getBasePricePerNight()).toBe(100);
    });

    it('deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity', () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '';
        propertyEntity.title = 'Casa';
        propertyEntity.description = 'Casa grande com piscina';
        propertyEntity.maxGuests = 4;
        propertyEntity.basePricePerNight = 100;

        expect(() => {
            PropertyMapper.toDomain(propertyEntity);
        }).toThrow('ID é obrigatório');
    });

    it('deve lançar erro de validação quando title estiver vazio ao converter para domínio', () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '1';
        propertyEntity.title = '';
        propertyEntity.description = '';
        propertyEntity.maxGuests = 4;
        propertyEntity.basePricePerNight = 100;

        expect(() => {
            PropertyMapper.toDomain(propertyEntity);
        }).toThrow('Título é obrigatório');
    });

    it('deve lançar erro de validação quando maxGuests for menor ou igual a zero ao converter para domínio', () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '1';
        propertyEntity.title = 'Casa';
        propertyEntity.description = 'Casa grande com piscina';
        propertyEntity.maxGuests = 0;
        propertyEntity.basePricePerNight = 100;

        expect(() => {
            PropertyMapper.toDomain(propertyEntity);
        }).toThrow('O número máximo de hóspedes deve ser maior que zero');
    });

    it('deve converter Property para PropertyEntity corretamente', () => {
        const property = new Property('1', 'Casa', 'Casa grande com piscina', 4, 100);

        const propertyEntity = PropertyMapper.toPersistence(property);
        
        expect(propertyEntity).toBeInstanceOf(PropertyEntity);
        expect(propertyEntity.id).toBe('1');
        expect(propertyEntity.title).toBe('Casa');
        expect(propertyEntity.description).toBe('Casa grande com piscina');
        expect(propertyEntity.maxGuests).toBe(4);
        expect(propertyEntity.basePricePerNight).toBe(100);
    });
});
