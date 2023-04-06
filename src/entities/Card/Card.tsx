
import basket from "../../shared/UI/SVG/Basket/BasketWhite.svg"
import "./Card.scss"
import bottle from "../../shared/UI/SVG/Weight/Bottle.svg"

import box from "../../shared/UI/SVG/Weight/Box.svg"
import { FC, useContext, useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import { ICardApi } from "../../shared/api/CardApi"
import { addBasket } from "../../app/Redux/Store/basket"

const Card: FC<ICardApi> = ({
    id,
    imgURL,
    name,
    price,
    manufacturer,
    code,
    brand,
    size,
}) => {
    const [type, setType] = useState<boolean>(true)
    const addBaskets = (post: any) => {
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        let posts = post
        posts.count = 1
        basket.push(posts)
        localStorage.setItem("basket", JSON.stringify(basket))
        dispatch(addBasket(basket))
        setType(false)
    }
    const dispatch = useDispatch()

    useEffect(() => {
        let res = []
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        for (let i = 0; i < basket.length; i++) {
            res.push(basket[i].id)
        }

        if (res?.includes(id)) {
            setType(false)
        }
    }, [])

    return (
        <div className="Card">
            <Link to={`/product/${id}`}>
                <div className="Card__img">
                    <img src={imgURL} />
                </div>
                <div className="Card__weight">
                    <img src={size.includes('Х') ? box : bottle} />
                    {size}
                </div>
                <div className="Card__name">
                    <p>{name}</p>
                </div>
                <div className="Card__code">
                    <p>
                        Штрихкод: <span>{code}</span>
                    </p>
                    <p>
                        Производитель: <span>{manufacturer}</span>
                    </p>
                    <p>
                        Бренд: <span>{brand} </span>
                    </p>
                </div>
            </Link>
            <div className="Card__price">
                <div className="Price" title={price + "₸"}>
                    <p>{price} ₸</p>
                </div>
                <div className="Button">
                    {type ? (
                        <MyButton
                            onClick={(e: React.MouseEvent) => {
                                addBaskets({
                                    id,
                                    imgURL,
                                    name,
                                    price,
                                    manufacturer,
                                    code,
                                    brand,
                                    size,
                                })
                            }}
                        >
                            В корзину <img src={basket} alt="" />
                        </MyButton>
                    ) : (
                        <Link to="/basket">
                            <MyButton>
                                К корзине <img src={basket} alt="" />
                            </MyButton>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card
