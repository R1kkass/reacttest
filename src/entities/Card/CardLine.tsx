import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import deletes from "../../shared/UI/SVG/Delete/Delete.svg"
import { ICardApi } from "../../shared/api/CardApi"
import { FC, useContext } from "react"
import "./CardLine.scss"
import { useDispatch } from "react-redux"
import { addBasket } from "../../app/Redux/Store/basket"
import Count from "../../shared/UI/Count/Count"
import { Link } from "react-router-dom"

const CardLine: FC<ICardApi> = ({ id, name, price, imgURL, size, count }) => {
    const dispatch = useDispatch()

    const countFn = (id: number) => {
        let baskets = JSON.parse(localStorage.getItem("basket") || "[]")
        let res = baskets.map((key: ICardApi) => {
            if (key.id == id) {
                console.log(id == key.id)

                key.count = (key?.count || 1) + 1
            }
            return key
        })
        localStorage.setItem("basket", JSON.stringify(res))
        dispatch(addBasket(res))
    }

    const deletePost = (id: number) => {
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        let res = basket.filter((key: ICardApi) => {
            return key.id != id
        })
        localStorage.setItem("basket", JSON.stringify(res))
        dispatch(addBasket(res))
    }

    const countFnMin = (id: number) => {
        let baskets = JSON.parse(localStorage.getItem("basket") || "[]")
        let res = baskets.map((key: ICardApi) => {
            if (key.id == id) {
                console.log(id == key.id)

                key.count = (key?.count || 1) - 1
            }
            return key
        })
        localStorage.setItem("basket", JSON.stringify(res))
        dispatch(addBasket(res))
    }

    return (
        <div className="CardLine__product">
            <Link to={`/product/${id}`}>
                <div className="CardLine__img">
                    <img src={imgURL} />
                </div>
                <div className="CardLine__info">
                    <p>{size}</p>
                    <p>{name}</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Facere, inventore.
                    </p>
                </div>
            </Link>
            <div className="CardLine__count">
                <Count
                    count={count || 1}
                    onClickMinus={() => countFnMin(id || 0)}
                    onClickPlus={() => countFn(id || 0)}
                />
            </div>
            <div className="CardLine__price">
                <p>{price}₸</p>
            </div>

            <div className="CardLine__delete">
                <MyButton onClick={() => deletePost(id || 0)}>
                    <img src={deletes} alt="" />
                </MyButton>
            </div>
        </div>
    )
}

export default CardLine
