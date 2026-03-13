import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";
import { CreatePropertyDTO } from "../dtos/create_property_dto";
import { v4 as uuidv4 } from "uuid";

export class PropertyService {
    constructor(private propertyRepository: PropertyRepository) {}

    async createProperty(dto: CreatePropertyDTO) {
        const property = new Property(
            uuidv4(),
            dto.title,
            dto.description,
            dto.maxGuest,
            dto.basePricePerNight
        );

        await this.propertyRepository.save(property);
        return property;
    }

    async findPropertyById(id: string) {
        return this.propertyRepository.findById(id);
    }
}