import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { CityModel } from 'src/app/models/city.model';
import { OrderModel } from 'src/app/models/order.model';
import store from 'src/app/redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { CartsService } from 'src/app/services/carts.service';
import { Router } from '@angular/router';
import { ErrorsService } from 'src/app/services/errors.service';


@Component({
    selector: 'app-shipping-details',
    templateUrl: './shipping-details.component.html',
    styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {

    public user = store.getState().authState.user;
    public cities: CityModel[];
    public order = new OrderModel();
    public cartItems = store.getState().cartsState.cartItems;
    public shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"));
    public minDate: string;
    public totalCartPrice: number;


    constructor(private errorsService: ErrorsService, private router: Router, private ordersService: OrdersService, private authService: AuthService, private cartsService: CartsService) { }

    public async ngOnInit() {
        try {
            // setting the minimum date for shipping the order (cannot be earlier than today)
            const curr = new Date();
            curr.setDate(curr.getDate());
            this.minDate = curr.toISOString().substr(0, 10);

            // get all cities (to display in the "select" box)
            this.cities = await this.authService.getCitiesList();

            // get the cart's total price to attach it to the order obj
            const totalPriceInfo = await this.cartsService.getTotalCartPrice(this.shoppingCart.cartId);
            this.totalCartPrice = totalPriceInfo.totalCartPrice

        }
        catch (err) {
            console.log(err);
            alert(this.errorsService.getError(err));
        }
    }

    public async submitOrder() {
        try {
            this.order.orderDate = new Date();
            this.order.cartId = this.shoppingCart.cartId;
            this.order.userId = this.user.userId;
            this.order.finalPrice = this.totalCartPrice;
            const addedOrder = await this.ordersService.addProduct(this.order);
            console.log(addedOrder);
            // updating the shopping cart's isOrdered status
            const updatedShoppingCart = await this.cartsService.updateIsOrdered(this.shoppingCart);
            console.log(updatedShoppingCart);

            // create receipt and save it on the server
            await this.ordersService.createReceipt(addedOrder.orderId);
            alert("Your order has been submitted successfully!");

            sessionStorage.removeItem("cartItems");
            sessionStorage.removeItem("shoppingCart");

            this.router.navigateByUrl("/home");
        }
        catch (err) {
            console.log(err);
            alert(this.errorsService.getError(err));
        }
    }

    // get user's street address when the user double-clicks on the the street input
    public async getUserStreet() {
        try {
            this.order.shippingStreet = this.user.street;
        }
        catch (err) {
            console.log(err);
            alert(this.errorsService.getError(err));

        }
    }

}
