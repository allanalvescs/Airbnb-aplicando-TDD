import { DateRange } from "../value_objects/date_range";
import { Booking } from "./booking";

export class Property {
    
    private readonly bookings: Booking[] = [];
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private maxGuests: number,
        private basePricePerNight: number,
    ) {
        this.validateRequiredFields(id, title, maxGuests, basePricePerNight);

        this.id = id;
        this.title = title;
        this.description = description;
        this.maxGuests = maxGuests;
        this.basePricePerNight = basePricePerNight;

    }

    getId(): string {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getMaxGuests(): number {
        return this.maxGuests;
    }

    getBasePricePerNight(): number {
        return this.basePricePerNight;
    }

    validateGuestCount(guestCount: number): void {
        if (guestCount > this.maxGuests) {
            throw new Error(`Número maximo de hóspedes excedido. O máximo permitido é ${this.maxGuests}.`);
        }
    }

    calculateTotalPrice(dateRange: DateRange): number {
        const totalNights = dateRange.getTotalNights();
        let totalPrice = totalNights * this.basePricePerNight;
        
        if (totalNights >= 7) {
            totalPrice *= 0.9;
        }

        return totalPrice;
    }

    isAvailable(dateRange: DateRange): boolean {
        return !this.bookings.some(booking => 
            booking.getStatus() === 'CONFIRMED' && 
            booking.getDateRange().overlaps(dateRange)
        );
    }

    addBooking(booking: Booking): void {
        this.bookings.push(booking);
    }

    private validateRequiredFields(id: string, title: string, maxGuests: number, basePricePerNight: number): void {
        if (!id) {
            throw new Error('ID é obrigatório');
        }

        if (!title) {
            throw new Error('O título da propriedade é obrigatório.');
        }

        if (maxGuests <= 0) {
            throw new Error('O número máximo de hóspedes deve ser maior que zero');
        }

        if (basePricePerNight < 0) {
            throw new Error('O preço base por noite deve ser maior que zero');
        }
    }

}