import { fa, faker } from '@faker-js/faker';


export function generateFirstName(): string {
    return faker.person.firstName();
}
export function generateLastName(): string {
    return faker.person.firstName();
}

export function generateString(length: number): string {
    return faker.string.alpha({ length: length });
}
