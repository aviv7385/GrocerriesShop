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
    public async getAllOrders(): Promise<OrderModel[]> {
        const orders = await this.httpClient.get<OrderModel[]>(environment.ordersUrl).toPromise();
        store.dispatch({ type: OrdersActionType.OrdersDownloaded, payload: orders });
        console.log(orders);
        return store.getState().ordersState.orders;
    }

    // add new order
    // send data to the server using Promise 
    public async addProduct(order: OrderModel): Promise<OrderModel> {
        const myFormData = new FormData();
        myFormData.append("cartId", order.cartId.toString());
        myFormData.append("userId", order.userId.toString());
        myFormData.append("finalPrice", order.finalPrice.toString());
        myFormData.append("cityId", order.cityId.toString());
        myFormData.append("shippingStreet", order.shippingStreet);
        myFormData.append("shippingDate", order.shippingDate.toString());
        myFormData.append("orderDate", order.orderDate.toString());
        myFormData.append("cc4Digits", order.cc4Digits);

        const addedOrder = await this.httpClient.post<OrderModel>(environment.ordersUrl, myFormData).toPromise();
        store.dispatch({ type: OrdersActionType.OrderAdded, payload: addedOrder });
        return addedOrder;
    }

    // create a receipt txt file that will be saved on the server and will be possible to download
    public async createReceipt(orderId: number):Promise<[]>{
        return await this.httpClient.get<[]>(environment.ordersUrl+"receipt/"+orderId).toPromise();
    }
}
