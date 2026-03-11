import { Property } from "../domain/entities/property";
import { PropertyRepository } from "../domain/repositories/property_repository";

export class FakePropertyRepository implements PropertyRepository {
    private properties: Property[] = [
        new Property('1', 'Casa', 'Casa grande com piscina', 4, 100),
        new Property('2', 'Apartamento', 'Apartamento moderno no centro', 3, 80)
    ];

    async save(property: Property): Promise<void> {
        this.properties.push(property);
    }

    async findById(id: string): Promise<Property | null> {
        return this.properties.find(p => p.getId() === id) || null;
    }
}