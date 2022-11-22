export class OrderUpdate {
    id: number;
    orderStatus: string;
    pizzaDelivered: boolean;
    pizzaDelivering: boolean;
    employeeId?: number;
    tip?: number;

    constructor(orderStatus: string, pizzaDelivered: boolean, pizzaDelivering: boolean, employeeId?: number, tip?: number) {
        this.orderStatus = orderStatus;
        this.pizzaDelivered = pizzaDelivered;
        this.pizzaDelivering = pizzaDelivering;
        this.employeeId = employeeId;
        this.tip = tip;
    }
}