import MyButton from "../../shared/UI/Buttons/MyButton/MyButton"
import CheckBox from "../../shared/UI/CheckBox/CheckBox"
import MyInput from "../../shared/UI/Input/MyInput"
import "./LeftBlockCatalog.scss"
import deletes from "../../shared/UI/SVG/Delete/Delete.svg"
import Filter from "../../shared/UI/Filter/Filter"
import { useEffect, useState } from "react"
import Toggle from "../../shared/UI/Toggle/Toggle"
import FilterBlock from "../FilterBlock/FilterBlock"

const LeftBlockCatalog = () => {
    const [query, setQuery] = useState<boolean>(false)

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

    if (query) {
        return (
            <Toggle nameBtn="Показать всё">
                <div className="LeftBlockCatalog">
                   <FilterBlock/>
                </div>
            </Toggle>
        )
    }

    return (
        <div className="LeftBlockCatalog">
           <FilterBlock/>
            <div>
                <Filter />
            </div>
        </div>
    )
}

export default LeftBlockCatalog
