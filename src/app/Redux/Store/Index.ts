import { combineReducers, createStore } from "redux"
import { ICardApi } from "../../../shared/api/CardApi"
import { basketReducer } from "./basket"
import { productReducer } from "./product"

export interface IRedux {
    basket: { basket: ICardApi[], count: number }
    product: { posts: ICardApi[], length: number }
}

const rootReducers = combineReducers({
    basket: basketReducer,
    product: productReducer,
})

export const store = createStore(rootReducers)
