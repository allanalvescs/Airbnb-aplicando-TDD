import { Property } from './property';
import { DateRange } from '../value_objects/date_range';
import { Booking } from './booking';
import { User } from './user';

describe('Property Entity', () => {

    it('deve criar uma instância de Property com todos os atributos', () => {
        const property = new Property(
            '123',
            'Casa dos Sonhos',
            'Uma linda casa com piscina e jardim.',
            4,
            200
        );

        expect(property.getId()).toBe('123');
        expect(property.getTitle()).toBe('Casa dos Sonhos');
        expect(property.getDescription()).toBe('Uma linda casa com piscina e jardim.');
        expect(property.getMaxGuests()).toBe(4);
        expect(property.getBasePricePerNight()).toBe(200);
    });

    it('deve lançar um erro se o nome for vazio', () => {
        expect(() => {
            new Property('123','','Uma casa com piscina e jardim.',4,200);
        }).toThrow('O título não pode ser vazio');
    });

    it('deve lançar um erro se o numero máximo de hóspedes for zero ou negativo', () => {
        expect(() => {
            new Property('123','Casa dos Sonhos','Uma casa com piscina e jardim.',0,200);
        }).toThrow('O número máximo de hóspedes deve ser maior que zero');
    });

    it('deve validar o número maximo de hóspedes', () => {
        const property = new Property('123','Casa dos Sonhos','Uma casa com piscina e jardim.',5, 150);

        expect(() => {
            property.validateGuestCount(6);
        }).toThrow(`Número maximo de hóspedes excedido. O máximo permitido é ${property.getMaxGuests()}.`);
    });

    it('não deve aplicar desconto para estádias menores que 7 noites', () => {
        const property = new Property('123','Apartamento','',2, 100);
        const dateRange = new DateRange(
            new Date('2024-12-10'),
            new Date('2024-12-16')
        );

        const totalPrice = property.calculateTotalPrice(dateRange);
        expect(totalPrice).toBe(600);
    });

    it('não deve aplicar desconto para estádias de 7 noites ou mais', () => {
        const property = new Property('123','Apartamento','',2, 100);
        const dateRange = new DateRange(
            new Date('2024-12-10'),
            new Date('2024-12-17')
        );

        const totalPrice = property.calculateTotalPrice(dateRange);
        expect(totalPrice).toBe(630);
    });

    it('deve verificar disponibilidade da propriedade', () => {
        const property = new Property('123','Apartamento','',4, 200);
        const dateRange = new DateRange(
            new Date('2024-12-20'),
            new Date('2024-12-25')
        );
        const user = new User('1', 'Maria');

        const dateRange2 = new DateRange(
            new Date('2024-12-22'),
            new Date('2024-12-27')
        );

        new Booking('1', property, user, dateRange, 2);

        expect(property.isAvailable(dateRange2)).toBe(false);
        expect(property.isAvailable(dateRange)).toBe(false);

    });

});