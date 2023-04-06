import { FC, useRef } from "react"
import './CheckBox.scss'

interface ICheckbox{
    text: string
    count: string
    callback?: ()=>void
    checked?: any
}

const CheckBox:FC<ICheckbox> = ({text, count, callback, checked}) => {
    const refCheck = useRef<HTMLInputElement>(null)

    return (
        <div className="CheckBox">
            <label>
                <input checked={checked || false} onClick={callback} ref={refCheck} type="checkbox" />
                <p className="CheckBox__text">{text}</p>
                <p className="CheckBox__count">({count})</p>
            </label>
        </div>
    )
}

export default CheckBox
