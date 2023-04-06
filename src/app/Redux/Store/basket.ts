import { ICardApi } from "../../../shared/api/CardApi"

const initialState = {
    basket: [],
    count: JSON.parse(localStorage.getItem('basket') || '[]')?.length || 0,
}

interface IAction {
    type: string
    basket: ICardApi[]
    count: number
}

export const ADD_BASKET = "ADD_BASKET"
export const ADD_COUNT = "ADD_COUNT"

export const basketReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case ADD_BASKET:
            console.log(action);
            
            return { ...state, basket: action.basket, count: action.basket.length }
        case ADD_COUNT:
            return { ...state, basket: action.count }
        default:
            return state
    }
}

export const addBasket = (posts:ICardApi[])=>({type: ADD_BASKET, basket: posts})
export const addCount = (count:number)=>({type: ADD_COUNT, count: count})
