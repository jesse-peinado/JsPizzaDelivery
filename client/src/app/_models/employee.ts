export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    salary: number;
    isCurrentEmployee: boolean;

    constructor(firstName: string, lastName: string, salary: number, isCurrentEmployee: boolean) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.isCurrentEmployee = isCurrentEmployee;
    }
}