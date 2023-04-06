import "./Navigation.scss"
import People from "./IMG/pngwing3.png"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import download from "../../shared/UI/SVG/Download/Download.svg"
import whatsapp from "../../shared/UI/SVG/Messangers/WhatsApp.svg"
import telegram from "../../shared/UI/SVG/Messangers/Telegram.svg"
import visa from "../../shared/UI/SVG/Visa/Visa.svg"
import masterCard from "../../shared/UI/SVG/Visa/MasterCard.svg"
import logo from "../../shared/UI/SVG/Logo/Logo.svg"
import catalog from "../../shared/UI/SVG/Catalog/Catalog.svg"
import address from "../../shared/UI/SVG/Address/Address.svg"
import email from "../../shared/UI/SVG/Email/Email.svg"
import baskets from "../../shared/UI/SVG/Basket/Basket.svg"
import logoFooter from "../../shared/UI/SVG/Logo/LogoFooter.svg"
import { Children, FC, useContext, useEffect, useState } from "react"
import MyInput from "../../shared/UI/Input/MyInput"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { IRedux } from "../../app/Redux/Store/Index"
import { ICardApi } from "../../shared/api/CardApi"
import search from "../../shared/UI/SVG/Search/Search.svg"
import LeftBlockCatalog from "../LeftBlockCatalog/LeftBlockCatalog"
import LeftBlockMobile from "../../shared/UI/LeftBlockMobile/LeftBlockMobile"
import mobile from "../../shared/UI/SVG/Mobile/Mobile.svg"

const Navigation: FC<{ children: React.ReactNode }> = ({ children }) => {
    const counts = useSelector((state: IRedux) => state.basket.count)
    const [query, setQuery] = useState<boolean>(false)

    const basket = JSON.parse(localStorage.getItem("basket") || "[]")?.reduce(
        (key: number, count: ICardApi) => {
            console.log(key)
            return (key = key + Number(count.price) * Number(count?.count || 1))
        },
        0
    )

    const bask = useSelector((state: IRedux) => state.basket.basket)

    useEffect(() => {
        var x: any = window.matchMedia("(max-width: 800px)")
        function myFunction(x: any) {
            if (x.matches) {
                setQuery(true)
            } else {
                setQuery(false)
            }
        }
        myFunction(x)
        x.addListener(myFunction)

        return x.removeListener(myFunction)
    }, [])

    const [visible, setVisible] = useState<boolean>(false)

    if (query) {
        return (
            <>
                <LeftBlockMobile
                    visible={visible}
                    setVisible={() => setVisible(false)}
                >
                    <div className="Navigation__address">
                        <img src={address} />
                        <div>
                            <p>г. Кокчетав, ул. Ж. Ташенова 129Б</p>
                            <p>(Рынок Восточный)</p>
                        </div>
                    </div>
                    <div className="Navigation__email">
                        <img src={email} />
                        <div>
                            <p>opt.sultan@mail.ru</p>
                            <p>На связи в любое время</p>
                        </div>
                    </div>
                    <div>
                        <p>О компании</p>
                    </div>
                    <div>
                        <p>Доставка и оплата</p>
                    </div>
                    <div>
                        <Link to="/adm">
                            <p>Админ панель</p>
                        </Link>
                    </div>
                    <div>
                        <p>Контакты</p>
                    </div>
                </LeftBlockMobile>
                <div className="Content">
                    <div className="Navigation">
                        <div className="Navigation__firstLine">
                            <div className="Navigation__container"></div>
                            <div
                                onClick={() => setVisible(true)}
                                className="Navigation__ellipse"
                            ><img src={mobile} alt="" /></div>
                            <div>
                                <img src={logo} />
                            </div>
                            <div>
                                <Link to="/basket">
                                    <div className="SecondLine__basket">
                                        <img src={baskets} />
                                        <div className="dottedBasket">
                                            <p>{counts}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="Navigation__secondLine">
                            <Link to="/">
                                <div className="SecondLine__button">
                                    <img src={catalog} />
                                    Каталог
                                    <img src={search} />
                                    Поиск
                                </div>
                            </Link>
                        </div>
                    </div>
                    {children}
                </div>
                <div className="Footer">
                    <div className="Footer__logo">
                        <img src={logoFooter} />
                        <p>
                            Компания «Султан» — снабжаем розничные магазины
                            товарами "под ключ" в Кокчетаве и Акмолинской
                            области
                        </p>
                        <p>Подпишись на скидки и акции</p>
                        <div>
                            <MyInput />
                        </div>
                    </div>
                    <div className="Footer__menu">
                        <h2>Меню сайта:</h2>
                        <p>О компании</p>
                        <p>Доставка и оплата</p>
                        <p>Возврат</p>
                        <p>Контакты</p>
                    </div>
                    <div className="Footer__menu">
                        <h2>Категории:</h2>
                        <p>Бытовая химия</p>
                        <p>Косметика и гигиена</p>
                        <p>Товары для дома</p>
                        <p>Товары для детей и мам</p>
                        <p>Посуда</p>
                    </div>
                    <div className="Footer__menu">
                        <h2>Скачать прайс-лист:</h2>
                        <MyButton>
                            Прайс-лист <img src={download}></img>
                        </MyButton>
                        <p>Связь в мессенджерах:</p>
                        <div className="Footer__messanger">
                            <img src={whatsapp}></img>
                            <img src={telegram}></img>
                        </div>
                    </div>
                    <div className="Footer__menu Footer__visa">
                        <h2>Контакты:</h2>
                        <div className="Footer__contactns">
                            <p>+7 (777) 490-00-91</p>
                            <p>время работы: 9:00-20:00</p>
                            <p>Заказать звонок</p>
                        </div>
                        <div className="Footer__contactns2">
                            <p>opt.sultan@mail.ru</p>
                            <p>На связи в любое время</p>
                        </div>

                        <div className="Footer__messanger">
                            <img src={visa}></img>
                            <img src={masterCard}></img>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="Content">
                <div className="Navigation">
                    <div className="Navigation__firstLine">
                        <div className="Navigation__container">
                            <div className="Navigation__address">
                                <img src={address} />
                                <div>
                                    <p>г. Кокчетав, ул. Ж. Ташенова 129Б</p>
                                    <p>(Рынок Восточный)</p>
                                </div>
                            </div>
                            <div className="Navigation__email">
                                <img src={email} />
                                <div>
                                    <p>opt.sultan@mail.ru</p>
                                    <p>На связи в любое время</p>
                                </div>
                            </div>
                        </div>
                        <div className="Navigation__navBar">
                            <div>
                                <p>О компании</p>
                            </div>
                            <div>
                                <p>Доставка и оплата</p>
                            </div>
                            <div>
                                <p>Возврат</p>
                            </div>
                            <div>
                                <p>Контакты</p>
                            </div>
                        </div>
                    </div>
                    <div className="Navigation__secondLine">
                        <img src={logo} />
                        <Link to="/">
                            <div className="SecondLine__button">
                                <MyButton>
                                    Каталог
                                    <img src={catalog} />
                                </MyButton>
                            </div>
                        </Link>

                        <div className="SecondLine__search">
                            <MyInput />
                        </div>
                        <div className="SecondLine__contact">
                            <div className="SecondLine__number">
                                <p>+7 (777) 490-00-91</p>
                            </div>
                            <div className="SecondLine__time">
                                <p>время работы: 9:00-20:00</p>
                            </div>
                            <div className="SecondLine__call">
                                <p>Заказать звонок</p>
                            </div>
                            <div className="SecondLine__img">
                                <img src={People} />
                                <div className="dottedGreen"></div>
                            </div>
                        </div>
                        <div>
                            <MyButton>
                                Прайс-лист
                                <img src={download} />
                            </MyButton>
                        </div>
                        <Link to="/basket">
                            <div className="SecondLine__basket">
                                <img src={baskets} />
                                <div className="dottedBasket">
                                    <p>{counts}</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/basket">
                            <div className="SecondLine__price">
                                <p>Корзина</p>
                                <p>
                                    {bask?.reduce((key, count) => {
                                        return (key +=
                                            Number(count.price) *
                                            (count?.count || 1))
                                    }, 0) || basket}
                                    ₸
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
                {children}
            </div>
            <div className="Footer">
                <div className="Footer__logo">
                    <img src={logoFooter} />
                    <p>
                        Компания «Султан» — снабжаем розничные магазины товарами
                        "под ключ" в Кокчетаве и Акмолинской области
                    </p>
                    <p>Подпишись на скидки и акции</p>
                    <div>
                        <MyInput />
                    </div>
                </div>
                <div className="Footer__menu">
                    <h2>Меню сайта:</h2>
                    <p>О компании</p>
                    <p>Доставка и оплата</p>
                    <p>Возврат</p>
                    <p>Контакты</p>
                </div>
                <div className="Footer__menu">
                    <h2>Категории:</h2>
                    <p>Бытовая химия</p>
                    <p>Косметика и гигиена</p>
                    <p>Товары для дома</p>
                    <p>Товары для детей и мам</p>
                    <p>Посуда</p>
                </div>
                <div className="Footer__menu">
                    <h2>Скачать прайс-лист:</h2>
                    <MyButton>
                        Прайс-лист <img src={download}></img>
                    </MyButton>
                    <p>Связь в мессенджерах:</p>
                    <div className="Footer__messanger">
                        <img src={whatsapp}></img>
                        <img src={telegram}></img>
                    </div>
                </div>
                <div className="Footer__menu Footer__visa">
                    <h2>Контакты:</h2>
                    <div className="Footer__contactns">
                        <p>+7 (777) 490-00-91</p>
                        <p>время работы: 9:00-20:00</p>
                        <p>Заказать звонок</p>
                    </div>
                    <div className="Footer__contactns2">
                        <p>opt.sultan@mail.ru</p>
                        <p>На связи в любое время</p>
                    </div>

                    <div className="Footer__messanger">
                        <img src={visa}></img>
                        <img src={masterCard}></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation
