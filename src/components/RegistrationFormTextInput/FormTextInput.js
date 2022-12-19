import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hints } from "../../utils/utils";
import "./Style.css"


const FormTextInput = (props) => {

    return (
        <>
            <label htmlFor={props.commonText}>
                {props.title}:
                <FontAwesomeIcon icon={faCheck} className={props.valid ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={props.valid || !props.value ? "hide" : "invalid"} />
            </label>
            <input
                type={props.type}
                id={props.commonText}
                autoComplete="off"
                onChange={(e) => props.onChange(e.target.name,e.target.value)}
                value={props.value}
                required
                aria-invalid={props.valid ? "false" : "true"}
                aria-describedby={props.note}
                onFocus={() => props.setFocus(props.name,true)}
                onBlur={() => props.setFocus(props.name,false)}
                name={props.name}
            />
            <p id={props.note} className={props.focus && props.value && !props.valid ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                {hints[props.name]}
            </p>
        </>
    )
}

export default FormTextInput
