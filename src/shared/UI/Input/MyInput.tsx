import { FC, useEffect } from "react"
import MyButton from "../Buttons/MyButton/MyButton"
import search from "../SVG/Search/Search.svg"
import "./MyInput.scss"

const MyInput: FC<{ callback?: (e: any) => void;  }> = ({callback}) => {

    const fn = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(callback){
            callback(e.target.value)
        }
    }

    return (
        <div className="MyInput">
            <input
                onChange={(e) => {
                    fn(e)
                }}
                placeholder="Поиск..."
            />
            <MyButton>
                <img src={search} />
            </MyButton>
        </div>
    )
}

export default MyInput
