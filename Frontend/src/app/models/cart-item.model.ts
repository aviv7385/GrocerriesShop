export class CartItemModel {
    public itemId: number;
    public productId: number;
    public cartId: number;
    public quantity: number;
    public productName: string;
    public price: number;
    public totalPrice: number;
    public imageFileName: string;
    public image: File;
    public totalCartPrice: number;
}