export interface EmployeeOrderReport {
    id: number;
    firstName: string;
    lastName: string;
    orderId: number;
    price: number;
    tip: number;
    completionTime: number;
    estimatedTime: number;
    differenceBetweenCompletionAndEstimated: number;
}