import { FC } from "react"
import './Count.scss'
const Count: FC<{
    count: number
    onClickMinus: () => void
    onClickPlus: () => void
}> = ({ onClickMinus, onClickPlus, count }) => {
    return (
        <div className="Count">
            <button onClick={onClickMinus}>-</button>
            <p>{count}</p>
            <button onClick={onClickPlus}>+</button>
        </div>
    )
}

export default Count
