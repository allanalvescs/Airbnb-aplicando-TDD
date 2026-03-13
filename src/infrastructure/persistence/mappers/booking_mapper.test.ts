import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";

describe('BookingMapper', () => {

    it('deve converter BookingEntity em Booking corretamente', () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '3';
        propertyEntity.title = 'Casa';
        propertyEntity.description = 'Casa grande com piscina';
        propertyEntity.maxGuests = 4;
        propertyEntity.basePricePerNight = 100;

        const userEntity = new UserEntity();
        userEntity.id = '2';
        userEntity.name = 'John Doe';

        const bookingEntity = new BookingEntity();
        bookingEntity.id = '1';
        bookingEntity.property = propertyEntity;
        bookingEntity.guest = userEntity;
        bookingEntity.startDate = new Date('2024-01-01');
        bookingEntity.endDate = new Date('2024-01-05');
        bookingEntity.guestCount = 2;
        bookingEntity.totalPrice = 500;
        bookingEntity.status = 'CONFIRMED';

        const booking = BookingMapper.toDomain(bookingEntity);

        expect(booking).toBeInstanceOf(Booking);
        expect(booking.getId()).toBe('1');
        expect(booking.getProperty()).toBeInstanceOf(Property);
        expect(booking.getProperty().getId()).toBe('3');
        expect(booking.getGuest()).toBeInstanceOf(User);
        expect(booking.getGuest().getId()).toBe('2');
        expect(booking.getDateRange()).toBeInstanceOf(DateRange);
    });

    it('deve lançar erro de validação quando guestCount for menor ou igual a zero ao converter para domínio', () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '3';
        propertyEntity.title = 'Casa';
        propertyEntity.description = 'Casa grande com piscina';
        propertyEntity.maxGuests = 4;
        propertyEntity.basePricePerNight = 100;

        const userEntity = new UserEntity();
        userEntity.id = '2';
        userEntity.name = 'John Doe';

        const bookingEntity = new BookingEntity();
        bookingEntity.id = '1';
        bookingEntity.property = propertyEntity;
        bookingEntity.guest = userEntity;
        bookingEntity.startDate = new Date('2024-01-01');
        bookingEntity.endDate = new Date('2024-01-05');
        bookingEntity.guestCount = 0;
        bookingEntity.totalPrice = 500;
        bookingEntity.status = 'CONFIRMED';

        expect(() => {
            BookingMapper.toDomain(bookingEntity);
        }).toThrow('O número de hóspedes deve ser maior que zero');
    });

    it('deve lançar erro de validação quando guestCount exceder maxGuests ao converter para domínio', () => {
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '3';
        propertyEntity.title = 'Casa';
        propertyEntity.description = 'Casa grande com piscina';
        propertyEntity.maxGuests = 4;
        propertyEntity.basePricePerNight = 100;

        const userEntity = new UserEntity();
        userEntity.id = '2';
        userEntity.name = 'John Doe';

        const bookingEntity = new BookingEntity();
        bookingEntity.id = '1';
        bookingEntity.property = propertyEntity;
        bookingEntity.guest = userEntity;
        bookingEntity.startDate = new Date('2024-01-01');
        bookingEntity.endDate = new Date('2024-01-05');
        bookingEntity.guestCount = 10;
        bookingEntity.totalPrice = 500;
        bookingEntity.status = 'CONFIRMED';

        expect(() => {
            BookingMapper.toDomain(bookingEntity);
        }).toThrow('Número maximo de hóspedes excedido. O máximo permitido é 4.');
    });

    it('deve converter Booking para BookingEntity corretamente', () => {
        const property = new Property('3', 'Casa', 'Casa grande com piscina', 4, 100);
        const user = new User('2', 'John Doe');
        const dateRange = new DateRange(new Date('2024-01-01'), new Date('2024-01-05'));
        const booking = new Booking('1', property, user, dateRange, 2);

        const bookingEntity = BookingMapper.toPersistence(booking);

        expect(bookingEntity).toBeInstanceOf(BookingEntity);
        expect(bookingEntity.id).toBe('1');
        expect(bookingEntity.property).toBeInstanceOf(PropertyEntity);
        expect(bookingEntity.property.id).toBe('3');
        expect(bookingEntity.guest).toBeInstanceOf(UserEntity);
        expect(bookingEntity.guest.id).toBe('2');
    });
});