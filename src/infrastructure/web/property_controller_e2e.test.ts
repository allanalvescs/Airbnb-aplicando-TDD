import express from "express";
import request from "supertest";

import { DataSource } from "typeorm";
import { TypeORMPropertyRepository } from "../repositories/property/typeorm_property_repository";
import { PropertyService } from "../../application/service/property_service";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { PropertyController } from "./property_controller";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { UserEntity } from "../persistence/entities/user_entity";
import { Property } from "../../domain/entities/property";

const app = express();
app.use(express.json());

let dataSource: DataSource;
let propertyRepository: TypeORMPropertyRepository;
let propertyService: PropertyService;
let propertyController: PropertyController;

beforeAll(async () => {
    dataSource = new DataSource({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
       entities: [PropertyEntity, BookingEntity, UserEntity],
        synchronize: true,
        logging: false,
    });
    await dataSource.initialize();

    propertyRepository = new TypeORMPropertyRepository(
        dataSource.getRepository(PropertyEntity)
    );

    propertyService = new PropertyService(propertyRepository);

    propertyController = new PropertyController(propertyService);
    
    app.post("/properties", (req, res, next) => {
        propertyController.createProperty(req, res).catch((err) => next(err));
    });
});

afterAll(async () => {
    await dataSource.destroy();
});

describe('PropertyController', () => {
    beforeAll(async () => {
        const propertyRepo = dataSource.getRepository(PropertyEntity);

        await propertyRepo.clear();
    });

    it('deve criar uma propriedade com sucesso', async () => {
        const response = await request(app).post("/properties").send({
            title: "Casa na praia",
            description: "Uma linda casa na praia com vista para o mar.",
            maxGuest: 5,
            basePricePerNight: 300
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Propriedade criada com sucesso");
    });

    it('deve retornar erro com código 400 e mensagem "O título da propriedade é obrigatório." ao enviar um título vazio', async () => {
        const response = await request(app).post("/properties").send({
            title: "",
            description: "Descrição válida",
            maxGuest: 5,
            basePricePerNight: 300
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("O título da propriedade é obrigatório.");
    });

    it(
        'deve retornar erro com código 400 e mensagem "O número máximo de hóspedes deve ser maior que zero" ao enviar maxGuests igual a zero ou negativo',
        async () => {
            const response = await request(app).post("/properties").send({
                title: "Casa na praia",
                description: "Uma linda casa na praia com vista para o mar.",
                maxGuest: 0,
                basePricePerNight: 300
            });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("O número máximo de hóspedes deve ser maior que zero");
        }
    );

    it('deve retornar erro com código 400 e mensagem "O preço base por noite deve ser maior que zero" ao enviar basePricePerNight ausente', async () => {
        const response = await request(app).post("/properties").send({
            title: "Casa na praia",
            description: "Uma linda casa na praia com vista para o mar.",
            maxGuest: 5,
            basePricePerNight: -100
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("O preço base por noite deve ser maior que zero");
    });
});