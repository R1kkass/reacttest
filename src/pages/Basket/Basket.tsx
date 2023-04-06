import { Fragment, useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBasket } from "../../app/Redux/Store/basket"
import Breadcrumbs from "../../features/BreadCrumbs/BreadCrumbs"
import { ICardApi } from "../../shared/api/CardApi"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import CardLine from "../../entities/Card/CardLine"
import Modal from "../../shared/UI/Modal/Modal"
import "./Basket.scss"


const Basket = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const dispatch = useDispatch()
    const bask: ICardApi[] = useSelector((state: any) => state.basket.basket)
    const count: number = useSelector((state: any) => state.basket.count)

    useEffect(() => {
        dispatch(addBasket(JSON.parse(localStorage.getItem("basket") || "[]")))
    }, [count])

    const clearBasket = () => {
        setVisible(true)
        localStorage.setItem("basket", "")
        dispatch(addBasket(JSON.parse(localStorage.getItem("basket") || "[]")))
    }

    return (
        <div className="Basket">
            <Breadcrumbs
                arr={[
                    { name: "Каталог", link: "/" },
                    { name: "Корзина", link: "/basket" },
                ]}
            />
            <Modal visible={visible} callback={() => setVisible(false)}>
                <h1 className="BasketThank">Спасибо за заказ</h1>
            </Modal>
            <h1>Корзина</h1>
            {bask?.map(
                ({
                    id,
                    code,
                    name,
                    price,
                    imgURL,
                    size,
                    brand,
                    manufacturer,
                    count,
                }) => (
                    <Fragment key={id}>
                    <CardLine
                        manufacturer={manufacturer}
                        code={code}
                        brand={brand}
                        price={price}
                        id={id}
                        name={name}
                        imgURL={imgURL}
                        size={size}
                        count={count}
                    />
                    </Fragment>
                )
            )}
            {count ? (
                <div className="Basket__order">
                    <div>
                        <MyButton onClick={() => clearBasket()}>
                            Оформить заказ
                        </MyButton>
                    </div>
                    <div>
                        <p>
                            {bask?.reduce((key, count) => {
                                return (key +=
                                    Number(count.price) * (count?.count || 1))
                            }, 0)}
                            ₸
                        </p>
                    </div>
                </div>
            ) : (
                <div className="Basket__order">
                    <h1>Корзина пуста</h1>
                </div>
            )}
        </div>
    )
}

export default Basket