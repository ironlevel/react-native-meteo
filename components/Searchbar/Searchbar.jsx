
import {s} from "./Searchbar.style";
import {TextInput} from "react-native";

export function Searchbar({onSubmit}) {

    return <TextInput onSubmitEditing={onSubmit} style={s.input} placeholder={"Chercher une ville... Ex: Paris"}/>
}