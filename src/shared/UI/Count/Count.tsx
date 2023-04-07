import { FC } from "react"
import './Count.scss'
const Count: FC<{
    count: number
    onClickMinus: () => void
    onClickPlus: () => void
}> = ({ onClickMinus, onClickPlus, count }) => {
    return (
        <div className="Count">
            <button onClick={onClickMinus} data-testid="-">-</button>
            <p>{count}</p>
            <button onClick={onClickPlus} data-testid="+">+</button>
        </div>
    )
}

export default Count
