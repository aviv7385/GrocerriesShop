import { CategoryModel } from './../models/category.model';


export class CategoriesState {
    public categories: CategoryModel[] = [];

    // On page refresh - load saved products back to state: 
    public constructor() {
        const categories = JSON.parse(sessionStorage.getItem("categories"));
        if (categories) {
            this.categories = categories;
        }
    }
}

// Categories Action Types: 
export enum CategoriesActionType {
    CategoriesDownloaded = "CategoriesDownloaded"
}

// Categories Action: 
export interface CategoriesAction {
    type: CategoriesActionType; // the type of action we want to execute
    payload?: any; // the data we want to send to Redux
}

// Categories Reducer: 
export function categoriesReducer(
    currentState: CategoriesState = new CategoriesState(),
    action: CategoriesAction): CategoriesState {

    const newState = { ...currentState }; // Duplicate currentState into a newState.

    switch (action.type) {
        case CategoriesActionType.CategoriesDownloaded:
            newState.categories = action.payload; // payload = all Categories
            break;
    }

    // Save categories also in sessionStorage:
    sessionStorage.setItem("categories", JSON.stringify(newState.categories));

    return newState; // Return the newState.
}