import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { filterPost } from "../../app/Redux/Store/product"
import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import CheckBox from "../../shared/UI/CheckBox/CheckBox"
import FilterUnitBlock from "../../shared/UI/FilterUnitBlock/FilterInitBlock"
import MyInput from "../../shared/UI/Input/MyInput"
import deletes from "../../shared/UI/SVG/Delete/Delete.svg"
import Toggle from "../../shared/UI/Toggle/Toggle"
import Price from "../Price/Price"

export type IManufac = {
    name: string
    count: string
}

const manufac: IManufac[] = [
    {
        name: "Grifon",
        count: "33",
    },
    {
        name: "Boyscout",
        count: "66",
    },
    {
        name: "Paclan",
        count: "166",
    },
    {
        name: "Булгари Грин",
        count: "166",
    },
    {
        name: "Grifon2",
        count: "33",
    },
    {
        name: "Boyscout2",
        count: "66",
    },
    {
        name: "Paclan2",
        count: "166",
    },
    {
        name: "Булгари Грин2",
        count: "166",
    },
]

const brand: IManufac[] = [
    {
        name: "Nivea",
        count: "33",
    },
    {
        name: "GRIFON",
        count: "66",
    },
    {
        name: "Домашний сундук",
        count: "166",
    },
    {
        name: "GRIFON1",
        count: "166",
    },
    {
        name: "Nivea2",
        count: "33",
    },
    {
        name: "GRIFON2",
        count: "66",
    },
    {
        name: "Домашний сундук2",
        count: "166",
    },
    {
        name: "HELP2",
        count: "166",
    },
]

const FilterBlock = () => {
    const [brands, setBrands] = useState(brand)
    const [manuf, setManuf] = useState(manufac)

    const [searchPrams, setSearchParams] = useSearchParams()

    const dispatch = useDispatch()

    const [brandsParam, setBrandsParam] = useState<string[]>(JSON.parse(searchPrams.get('brandParam') || '[]'))
    const [manufParam, setManufParam] = useState<string[]>(JSON.parse(searchPrams.get('manufParam') || '[]'))

    const change = (value: any) => {
        setBrands(
            brand.filter((e) => {
                return e.name.toLowerCase().includes(value)
            })
        )
    }

    const changeMan = (value: any) => {
        setManuf(
            manufac.filter((e) => {
                return e.name.toLowerCase().includes(value)
            })
        )
    }

    useEffect(() => {
        dispatch(filterPost(searchPrams))
    }, [searchPrams])

    const pushMan = (name: string) => {
        if (JSON.parse(searchPrams.get("manufParam") || "[]").includes(name)) {
            setManufParam(
                manufParam.filter((manum) => {
                    return manum != name
                })
            )
            searchPrams.set(
                "manufParam",
                JSON.stringify(
                    manufParam.filter((manum) => {
                        return manum != name
                    })
                )
            )
            searchPrams.set("page", "1")
            setSearchParams(searchPrams)
        } else {
            const setArr = new Set(manufParam)
            setArr.add(name)
            setManufParam([...setArr])
            searchPrams.set("manufParam", JSON.stringify([...setArr]))
            searchPrams.set("page", "1")
            setSearchParams(searchPrams)
        }
        dispatch(filterPost(searchPrams))
    }

    const pushBrand = (name: string) => {
        if (JSON.parse(searchPrams.get("brandParam") || "[]").includes(name)) {
            setBrandsParam(
                brandsParam.filter((manum) => {
                    return manum != name
                })
            )
            searchPrams.set(
                "brandParam",
                JSON.stringify(
                    brandsParam.filter((manum) => {
                        return manum != name
                    })
                )
            )
            setSearchParams(searchPrams)
        } else {
            const setArr = new Set(brandsParam)
            setArr.add(name)
            setBrandsParam([...setArr])
            searchPrams.set("brandParam", JSON.stringify([...setArr]))

            setSearchParams(searchPrams)
        }
        dispatch(filterPost(searchPrams))
    }

    return (
        <>
            <div className="LeftBlockCatalog__text">
                <h4>ПОДБОР ПО ПАРАМЕТРАМ</h4>
            </div>
            <div className="LeftBlockCatalog__price">
                <p>Цена</p>
            </div>
            <Price />
            <div className="LeftBlockCatalog__text">
                <h4>Производитель</h4>
            </div>
            <div className="LeftBlockCatalog__input">
                <MyInput callback={changeMan} />
                <FilterUnitBlock typeParam='manufParam' manuf={manuf} callback={pushMan}/>
            </div>
            <div className="LeftBlockCatalog__text">
                <h4>Бренд</h4>
            </div>
            <div className="LeftBlockCatalog__input">
                <MyInput callback={change} />
                <FilterUnitBlock typeParam='brandParam' manuf={brands} callback={pushBrand}/>

                <div className="InputButton">
                    <MyButton>Показать</MyButton>
                    <MyButton>
                        <img src={deletes} />
                    </MyButton>
                </div>
            </div>
        </>
    )
}

export default FilterBlock
