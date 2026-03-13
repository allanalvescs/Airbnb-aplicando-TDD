import { Request, Response } from "express";
import { PropertyService } from "../../application/service/property_service";
import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";

export class PropertyController {
    private readonly propertyService: PropertyService;
    constructor(propertyService: PropertyService) {
        this.propertyService = propertyService;
    }

    async createProperty(req: Request, res: Response): Promise<Response> {
        try {
            const dto: CreatePropertyDTO = {
                title: req.body.title,
                description: req.body.description,
                maxGuest: req.body.maxGuest,
                basePricePerNight: req.body.basePricePerNight
            };

            const property = await this.propertyService.createProperty(dto);
            return res.status(201).json({
                message: "Propriedade criada com sucesso",
                property: {
                    id: property.getId(),
                    title: property.getTitle(),
                    description: property.getDescription(),
                    maxGuest: property.getMaxGuests(),
                    basePricePerNight: property.getBasePricePerNight()
                }
            });
        } catch (error: any) {
            return res
                .status(400)
                .json({ message: error.message || "Erro ao criar propriedade" });
        }
    }
}