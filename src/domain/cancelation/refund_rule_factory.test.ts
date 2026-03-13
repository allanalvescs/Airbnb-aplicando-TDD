import { FullRefund } from "./full_refund";
import { NoRefund } from "./no_refund";
import { PartialRefund } from "./partial_refund";
import { RefundRuleFactory } from "./refund_rule_factory";
import { DateRange } from "../value_objects/date_range";

describe('RefundRuleFactory', () => {

    it('deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência', () => {
        const dateRange = new DateRange(
            new Date('2024-12-20'),
            new Date('2024-12-25')
        );
        const currentDate = new Date('2024-12-10');
        const checkInDate = dateRange.getStartDate();
        const diffTime = checkInDate.getTime() - currentDate.getTime();
        const daysUntilCheckIn = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        
        const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);

        expect(refundRule).toBeInstanceOf(FullRefund);
    });

    it('deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência', () => {
        const dateRange = new DateRange(
            new Date('2024-12-20'),
            new Date('2024-12-25')
        );
        const currentDate = new Date('2024-12-15');
        const checkInDate = dateRange.getStartDate();
        const diffTime = checkInDate.getTime() - currentDate.getTime();
        const daysUntilCheckIn = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
        expect(refundRule).toBeInstanceOf(PartialRefund);
    });

    it('deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência', () => {
                const dateRange = new DateRange(
            new Date('2024-12-20'),
            new Date('2024-12-25')
        );
        const currentDate = new Date('2024-12-20');
        const checkInDate = dateRange.getStartDate();
        const diffTime = checkInDate.getTime() - currentDate.getTime();
        const daysUntilCheckIn = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const refundRule = RefundRuleFactory.getRefundRule(daysUntilCheckIn);
        expect(refundRule).toBeInstanceOf(NoRefund);
    });
});