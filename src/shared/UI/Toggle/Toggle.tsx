import { Children, FC, useState } from "react"
import './Toggle.scss'
import polygonBottom from '../SVG/Polygon/PolygonBottom.svg'
import polygonTop from '../SVG/Polygon/PolygonTop.svg'

const Toggle:FC<{children: React.ReactNode, nameBtn: string, num?: number}> = ({children, nameBtn,num=0}) => {
    const [bol, setBol] = useState<boolean>(false)

    if (bol) {
        return (
            <div className="Toggle">
                <button data-testid="btn" onClick={() => setBol((p) => !p)}>{nameBtn} <img src={polygonTop}/></button>
                <div>
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className="Toggle">
            <button data-testid="btn" onClick={() => setBol((p) => !p)}>{nameBtn} <img src={polygonBottom}/></button>
        </div>
    )
}

export default Toggle
