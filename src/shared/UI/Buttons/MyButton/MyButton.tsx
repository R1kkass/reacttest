import { FC } from "react"
import "./MyButton.scss"

const MyButton: FC<any> = ({ children, onClick }, props) => {
    return <button className="MyButton" onClick={onClick} {...props}>{children}</button>
}

export default MyButton
