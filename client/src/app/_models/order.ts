export class Order {
    id: number;
    pizzaType: string;
    pizzaSize: string;
    price: number;
    deliveryAddress: string;
    orderStatus: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    estimatedTime: number;
    dateTimeDelivered?: string;
    dateTimeDelivering?: string;
    dateTimeOrdered: string;

    employeeId?: number;
    tip?: number;

    constructor(pizzaType: string, pizzaSize: string, price: number, deliveryAddress: string, orderStatus: string, phoneNumber: string, firstName: string, lastName: string, estimatedTime: number, employeeId?: number, tip?: number) {
        this.pizzaType = pizzaType;
        this.pizzaSize = pizzaSize;
        this.price = price;
        this.deliveryAddress = deliveryAddress;
        this.orderStatus = orderStatus;
        this.phoneNumber = phoneNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.estimatedTime = estimatedTime;
        this.employeeId = employeeId;
        this.tip = tip;
    }
}