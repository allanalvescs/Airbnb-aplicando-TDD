import { PropertyRepository } from "../domain/repositories/property_repository";

export class PropertyService {
    constructor(private propertyRepository: PropertyRepository) {}

    async findPropertyById(id: string) {
        return this.propertyRepository.findById(id);
    }
}