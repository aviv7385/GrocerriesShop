import { ProductModel } from "../models/product.model";

export class ProductsState {
    public products: ProductModel[] = [];

    // On page refresh - load saved products back to state: 
    public constructor() {
        const products = JSON.parse(sessionStorage.getItem("products"));
        if (products) {
            this.products = products;
        }
    }
}

// Products Action Types: 
export enum ProductsActionType {
    ProductsDownloaded = "ProductsDownloaded",
    ProductAdded = "ProductAdded",
    ProductUpdated = "ProductUpdated"
}

// Products Action: 
export interface ProductsAction {
    type: ProductsActionType; // the type of action we want to execute
    payload?: any; // the data we want to send to Redux
}

// Products Reducer: 
export function productsReducer(
    currentState: ProductsState = new ProductsState(),
    action: ProductsAction): ProductsState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case ProductsActionType.ProductsDownloaded:
            newState.products = action.payload; // payload = all products
            break;

        case ProductsActionType.ProductAdded:
            newState.products.push(action.payload); // payload = the added product
            break;

        case ProductsActionType.ProductUpdated:
            const indexToUpdate = newState.products.findIndex(p => p.productId == action.payload.id);
            newState.products[indexToUpdate] = action.payload; // payload = the updated product
            break;
    }

    // Save products also in sessionStorage:
    sessionStorage.setItem("products", JSON.stringify(newState.products));
    
    return newState; // Return the newState.
}