export class RegistrationUser {

    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    subject: string;
    currentAddress: string;

    constructor(data: Partial<RegistrationUser>) {
        Object.assign(this, data);
    }
}