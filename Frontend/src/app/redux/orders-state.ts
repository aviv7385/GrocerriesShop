import { OrderModel } from './../models/order.model';

export class OrdersState {
    public orders: OrderModel[] = [];
    public order: OrderModel;

    // // On page refresh - load saved products back to state: 
    // public constructor() {
    //     const order = JSON.parse(sessionStorage.getItem("order"));
    //     if (order) {
    //         this.order = order;
    //     }
    // }
}

// action types
export enum OrdersActionType {
    OrdersDownloaded = "OrdersDownloaded",
    OrderDownloaded = "OrderDownloaded",
    OrderAdded = "OrderAdded"
}

// actions
export interface OrdersAction {
    type: OrdersActionType;
    payload: any;
}

// reducer
export function ordersReducer(
    currentState: OrdersState = new OrdersState(),
    action: OrdersAction): OrdersState {
    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case OrdersActionType.OrdersDownloaded:
            newState.orders = action.payload;
            break;

        case OrdersActionType.OrderDownloaded:
            newState.order = action.payload;
            break;

        case OrdersActionType.OrderAdded:
            newState.orders.push(action.payload); // payload = the added order
            break;

    }

    // save in session storage:
    // sessionStorage.setItem("order", JSON.stringify(newState.order));

    return newState; // Return the newState.

}

