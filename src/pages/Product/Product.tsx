import { useDebugValue, useEffect, useState } from "react"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import Count from "../../shared/UI/Count/Count"
import "./Product.scss"
import share from "../../shared/UI/SVG/Share/Share.svg"
import basket from "../../shared/UI/SVG/Basket/BasketWhite.svg"
import downloadBlack from "../../shared/UI/SVG/Download/DownloadBlack.svg"
import Breadcrumbs from "../../features/BreadCrumbs/BreadCrumbs"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import {
    CardApi,
    CardApiId,
    ICardApi,
    ICardData,
} from "../../shared/api/CardApi"
import { addBasket } from "../../app/Redux/Store/basket"
import Toggle from "../../shared/UI/Toggle/Toggle"
import Loader from "../../shared/UI/Loader/Loader"

export interface ICardDataOne {
    data: ICardApi
}

const Product = () => {
    const [count, setCount] = useState<number>(1)
    const [prod, setProd] = useState<ICardApi>()
    const [type, setType] = useState<boolean>(true)
    const countMin = () => {
        if (count > 1) {
            setCount((p) => p - 1)
        }
    }

    const params = useParams()

    useEffect(() => {
        CardApiId(params?.id || "0").then((e: ICardDataOne) => {
            setProd(e?.data || [])
            console.log(e)
        })
        let res = []
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        for (let i = 0; i < basket.length; i++) {
            res.push(basket[i].id)
        }

        if (res?.includes(params.id)) {
            setType(false)
        }
    }, [])

    const addBaskets = (post: ICardApi) => {
        let basket = JSON.parse(localStorage.getItem("basket") || "[]")
        let posts = post
        posts.count = count
        basket.push(posts)
        localStorage.setItem("basket", JSON.stringify(basket))
        dispatch(addBasket(basket))
        setType(false)

    }
    const dispatch = useDispatch()

    if (!prod?.name) {
        return <Loader/>
    }

    return (
        <div className="Container">
            <Breadcrumbs
                arr={[
                    { name: "Каталог", link: "/" },
                    { name: `${prod?.name}`, link: `/product/${params.id}` },
                ]}
            />
            <div className="Product">
                <div className="Product__img">
                    <img src={prod?.imgURL}></img>
                </div>
                <div className="Product__info">
                    <div className="Product__type">
                        <p>В наличии</p>
                    </div>
                    <div className="Product__name">
                        <p>{prod?.name}</p>
                    </div>
                    <div className="Product__weight">
                        <p>{prod?.size}</p>
                    </div>
                    <div className="Product__price">
                        <div className="Price">
                            <h2>{prod?.price} ₸</h2>
                        </div>
                        {type ? (
                            <>
                        <div className="Count">
                            <Count
                                count={count}
                                onClickMinus={() => {
                                    countMin()
                                }}
                                onClickPlus={() => {
                                    setCount((p) => p + 1)
                                }}
                            />
                        </div>
                        <div className="Button">
                           
                                <MyButton
                                    onClick={() => {
                                        addBaskets(prod || {})
                                    }}
                                >
                                    В корзину <img src={basket} />
                                </MyButton>
                                </div>
                                </>
                            ) : (
                                <Link to="/basket">
                                    <MyButton>
                                        К корзине <img src={basket} />
                                    </MyButton>
                                </Link>
                            )}
                        
                    </div>
                    <div className="Product__buttons">
                        <div className="Share">
                            <img src={share} />
                        </div>
                        <div className="Promotion">
                            <p>
                                При покупке от 10 000 ₸ бесплатная доставка по
                                Кокчетаву и области
                            </p>
                        </div>
                        <div className="PriceList">
                            <p>
                                Прайс-лист <img src={downloadBlack} />
                            </p>
                        </div>
                    </div>
                    <div className="Product__brand">
                        <p className="Pargaraph">
                            Производитель: <span>{prod?.manufacturer}</span>
                        </p>
                        <p className="Pargaraph">
                            Бренд: <span>{prod?.brand}</span>
                        </p>
                        <p className="Pargaraph">
                            Артикул: <span>{prod?.code}</span>
                        </p>
                        <p className="Pargaraph">
                            Штрихкод: <span>{prod?.code}</span>
                        </p>
                    </div>
                    <div className="Product__discription">
                        <Toggle nameBtn="Описание">
                            <p>{prod?.description}</p>
                        </Toggle>
                    </div>
                    <div className="Product__characteristics">
                        <Toggle nameBtn="Характеристики">
                            <p className="Pargaraph">
                                Производитель: <span>{prod?.manufacturer}</span>
                            </p>
                            <p className="Pargaraph">
                                Бренд: <span>{prod?.brand}</span>
                            </p>
                            <p className="Pargaraph">
                                Артикул: <span>{prod?.code}</span>
                            </p>
                            <p className="Pargaraph">
                                Штрихкод: <span>{prod?.code}</span>
                            </p>
                            <p className="Pargaraph">
                                Вес: <span>{prod.size}</span>
                            </p>
                            <p className="Pargaraph">
                                Объём: <span>{prod.size}</span>
                            </p>
                            <p className="Pargaraph">
                                Кол-во в коробке: <span>{prod.size}</span>
                            </p>
                        </Toggle>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
