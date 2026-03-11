import { FullRefund } from "../cancelation/full_refund";
import { PartialRefund } from "../cancelation/partial_refund";
import { RefundRuleFactory } from "../cancelation/refund_rule_factory";
import { DateRange } from "../value_objects/date_range";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
    private readonly id: string;
    private readonly property: Property
    private readonly user: User;
    private readonly dateRange: DateRange;
    private readonly guestCount: number;
    private status: 'CONFIRMED' | 'CANCELLED' = 'CONFIRMED';
    private totalPrice: number;

    constructor(
        id: string,
        property: Property,
        user: User,
        dateRange: DateRange,
        guestCount: number
    ) {
        if (guestCount <= 0) {
            throw new Error('O número de hóspedes deve ser maior que zero');
        }

        property.validateGuestCount(guestCount);

        if (!property.isAvailable(dateRange)) {
            throw new Error('A propriedade não está disponível para o período selecionado.');
        }

        this.id = id;
        this.property = property;
        this.user = user;
        this.dateRange = dateRange;
        this.guestCount = guestCount;
        this.totalPrice = property.calculateTotalPrice(dateRange);
        this.status = 'CONFIRMED';

        property.addBooking(this);
    }

    getId(): string {
        return this.id;
    }

    getProperty(): Property {
        return this.property;
    }

    getUser(): User {
        return this.user;
    }

    getDateRange(): DateRange {
        return this.dateRange;
    }

    getGuestCount(): number {
        return this.guestCount;
    }

    getStatus(): 'CONFIRMED' | 'CANCELLED' {
        return this.status;
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }

    cancel(currentDate: Date): void {
        if (this.status === 'CANCELLED') {
            throw new Error('A reserva já foi cancelada.');
        }

        const checkInDate = this.dateRange.getStartDate();
        const diffTime = checkInDate.getTime() - currentDate.getTime();
        const daysUntilCheckIn = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
        this.totalPrice = refundRule.calculateRefund(this.totalPrice);
        this.status = 'CANCELLED';
    }
}

// if (daysUntilCheckIn > 7) {
//     // this.totalPrice = 0;
//     const refund = new FullRefund();
//     this.totalPrice = refund.calculateRefund(this.totalPrice);
// } else if (daysUntilCheckIn >= 1) {
//     // this.totalPrice = this.totalPrice * 0.5;
//     const refund = new PartialRefund();
//     this.totalPrice = refund.calculateRefund(this.totalPrice);
// }