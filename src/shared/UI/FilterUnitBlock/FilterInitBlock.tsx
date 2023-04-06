import { FC, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { IManufac } from "../../../widgets/FilterBlock/FilterBlock"
import CheckBox from "../CheckBox/CheckBox"
import polygonBottom from '../SVG/Polygon/PolygonBottom.svg'
import polygonTop from '../SVG/Polygon/PolygonTop.svg'

const FilterUnitBlock: FC<{
    manuf: IManufac[]
    callback: (name: string) => void
    typeParam: string
}> = ({ manuf, callback, typeParam }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [height, setHeight] = useState<string>("130px")

    return (
        <>
            <div style={{ height: height }}>
                {manuf?.map(({ name, count }) => (
                    <CheckBox
                        checked={JSON.parse(
                            searchParams.get(typeParam) || "[]"
                        ).includes(name)}
                        callback={()=>callback(name)}
                        text={name}
                        count={count}
                    />
                ))}
            </div>
            <p
                className="more"
                onClick={() =>
                    setHeight((p) => (p == "100%" ? "130px" : "100%"))
                }
            >
                Показать всё
                <img src={height=='100%' ? polygonTop : polygonBottom} alt="" />
            </p>
        </>
    )
}

export default FilterUnitBlock