import { CartsActionType } from './../../redux/carts-state';
import { Component, Input, OnInit } from '@angular/core';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { CartsService } from 'src/app/services/carts.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Unsubscribe } from 'redux';


@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {


    @Input() // props
    public product: ProductModel;
    public imageUrl: string;
    public shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart"));
    public cartItem = new CartItemModel();
    public cartItems: CartItemModel[];
    public user = store.getState().authState.user;
    public closeResult = '';
    public totalCartPrice: number;
    private unsubscribeStore: Unsubscribe;
    

    constructor(private modalService: NgbModal, private errorsService: ErrorsService, private cartsService: CartsService) {
        this.unsubscribeStore = store.subscribe(() => { // Start listening for changes.
            this.cartItems = store.getState().cartsState.cartItems;
            //this.totalCartPrice = store.getState().cartsState.cartTotalPrice;
        });
     }

    public async ngOnInit() {
        try {
            // get the product's image url
            this.imageUrl = environment.productsUrl + "images/" + this.product.imageFileName;
        }
        catch (err) {
            this.errorsService.getError(err);
        }
    }

    // add items to the cart
    public async addItemToCart() {
        try {
            const addedItem = await this.cartsService.addCartItem(this.cartItem, this.product.productId, this.cartItem.quantity);
            console.log(addedItem);

            const totalPriceInfo = await this.cartsService.getTotalCartPrice(this.shoppingCart.cartId);
            this.totalCartPrice = totalPriceInfo.totalCartPrice
            store.dispatch({type: CartsActionType.CartTotalPrice, payload: this.totalCartPrice})
        }
        catch (err) {
            alert(this.errorsService.getError(err));
            console.log(err);
        }
    }

    // popup dialog for choosing product's quantity 
    public open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    // close the popup dialog
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribeStore();
    }
}
