export class OrderModel {
    public orderId: number;
    public cartId: number;
    public userId: number;
    public finalPrice: number;
    public cityId: number;
    public shippingStreet: string;
    public shippingDate: Date;
    public orderDate: Date; // date stamp
    public cc4Digits: string;
}