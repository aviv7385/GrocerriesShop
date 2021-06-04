import { OrdersActionType } from './../redux/orders-state';
import { OrderModel } from './../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    constructor(private httpClient: HttpClient) { }

    // // get one order
    // public async getOneOrder(cartId: number): Promise<OrderModel> {
    //     const order = await this.httpClient.get<OrderModel>(environment.ordersUrl + "order/" + cartId).toPromise();
    //     store.dispatch({ type: OrdersActionType.OrderDownloaded, payload: order });
    //     console.log("order: " + store.getState().ordersState.order);
    //     return store.getState().ordersState.order;
    // }

    // get all orders
    public async getAllOrders():Promise<OrderModel[]>{
        const orders = await this.httpClient.get<OrderModel[]>(environment.ordersUrl).toPromise();
        store.dispatch({type: OrdersActionType.OrdersDownloaded, payload:orders});
        console.log(orders);
        return store.getState().ordersState.orders;
    }
}
