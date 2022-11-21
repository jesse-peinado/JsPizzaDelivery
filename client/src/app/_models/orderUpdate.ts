export class OrderUpdate {
    id: number;
    orderStatus: string;
    pizzaDelivered: boolean;
    employeeId?: number;
    tip?: number;

    constructor(orderStatus: string, pizzaDelivered: boolean, employeeId?: number, tip?: number) {
        this.orderStatus = orderStatus;
        this.pizzaDelivered = pizzaDelivered;
        this.employeeId = employeeId;
        this.tip = tip;
    }
}