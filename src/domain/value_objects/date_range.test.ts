import { DateRange } from "./date_range";

describe('DateRange Value Object', () => {
    it('deve criar uma instância de DateRange com datas válidas e verificar o retorno dessas data', () => {
        const startDate = new Date('2024-12-20');
        const endDate = new Date('2024-12-25');
        const dateRange = new DateRange(startDate, endDate);

        expect(dateRange).toBeInstanceOf(DateRange);
        expect(dateRange.getStartDate()).toEqual(startDate);
        expect(dateRange.getEndDate()).toEqual(endDate);
    });

    it("deve lançar um erro se a data de termino for anterior à data de início", () => {
        expect(() => {
            new DateRange(new Date('2024-12-25'), new Date('2024-12-20'));
        }).toThrow("A data de término deve ser posterior à data de início.");
    });

    it('deve calcular o total de noites corretamente', () => {
        const startDate1 = new Date('2024-12-20');
        const endDate1 = new Date('2024-12-25');
        const dateRange1 = new DateRange(startDate1, endDate1);
        
        const totalNights1 = dateRange1.getTotalNights();

        expect(totalNights1).toBe(5);

        const startDate2 = new Date('2024-12-10');
        const endDate2 = new Date('2024-12-25');
        const dateRange2 = new DateRange(startDate2, endDate2);

        const totalNights2 = dateRange2.getTotalNights();

        expect(totalNights2).toBe(15);
    });

    it('deve verificar se dois intervalos de data se sobrepõem', () => {
        const dateRange1 = new DateRange(
            new Date('2024-12-20'),
            new Date('2024-12-25')
        );

        const dateRange2 = new DateRange(
            new Date('2024-12-22'),
            new Date('2024-12-27')
        );

        const overlaos = dateRange1.overlaps(dateRange2);

        expect(overlaos).toBe(true);

        const dateRange3 = new DateRange(
            new Date('2024-12-20'),
            new Date('2024-12-25')
        );

        const dateRange4 = new DateRange(
            new Date('2024-12-01'),
            new Date('2024-12-15')
        );
        const overlaps2 = dateRange3.overlaps(dateRange4);

        expect(overlaps2).toBe(false);
    });

    it('deve lançar um erro se a data de inicio e término forem iguais', () => {
        const date = new Date('2024-12-20');

        expect(() => {
            new DateRange(date, date);
        }).toThrow("A data de início e término não podem ser iguais.");
    });
})