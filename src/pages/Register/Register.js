import { useRef, useState, useEffect } from "react";
import FormTextInput from "../../components/RegistrationFormTextInput/FormTextInput";
import { regexObj } from '../../utils/utils';
import axios from '../../api/axios';
import "./Style.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const REGISTER_URL = '/auth/create';

const Register = () => {
    const errRef = useRef();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        user: '',
        pwd: '',
        matchPwd: '',
        email: ''
    })
    
    const [isValid, setvalid] = useState({
        user: false,
        pwd: false,
        matchPwd:false,
        email: false,
    })

    const [focus, setFocus] = useState({
        //fullName: false,
        user: false,
        pwd: false,
        matchPwd: false,
        email: false,
    })

    const [validMatch, setValidMatch] = useState(false);
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => { 
        setValidMatch((userDetails.pwd === userDetails.matchPwd)&& isValid.matchPwd);
    }, [userDetails.matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [userDetails])



    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!checkDisable()){
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const res =await axios.post(REGISTER_URL,{
                username:userDetails.user,
                email:userDetails.email,
                password:userDetails.pwd
            })
            setUserDetails({
                fullName: '',
                user: '',
                pwd: '',
                matchPwd: '',
                email: ''
            })
            navigate("/login")
        } catch (err) {
            if(!err?.response){
                setErrMsg("no server response");
             }else{
                //console.log(err.response);
               setErrMsg(err.response.data)
             }
             errRef.current.focus();
        }
       


    }

    const handleChange = (name, value) => {

        setUserDetails((prev) => {
            return { ...prev, [name]: value }
        })
        setvalid((prev) => {
            return { ...prev, [name]: value.match(regexObj[name]) }
        });
    }

    const handleFocus = (name, value) => {
        setFocus((prev) => {
            return { ...prev, [name]: value }
        });

    }

    const checkDisable = ()=>{
        let valid =true
        for (const el in isValid) {
            if(!isValid[el]){
                valid=false
                break;
            }
        }
        return validMatch && valid
    }

    return (
        <div className="main">
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <FormTextInput
                            type="text"
                            value={userDetails.user}
                            onChange={handleChange}
                            setFocus={handleFocus}
                            commonText="username"
                            title="Username"
                            name="user"
                            valid={isValid.user}
                            note="uidnote"
                            focus={focus.user}
                        />

                        <FormTextInput
                            type="text"
                            value={userDetails.email}
                            onChange={handleChange}
                            setFocus={handleFocus}
                            commonText="email"
                            title="Email"
                            name="email"
                            valid={isValid.email}
                            note="Emailnote"
                            focus={focus.email}
                        />

                        <FormTextInput
                            type="password"
                            value={userDetails.pwd}
                            onChange={handleChange}
                            setFocus={handleFocus}
                            commonText="password"
                            title="Password"
                            valid={isValid.pwd}
                            note="pwdnote"
                            name="pwd"
                            focus={focus.pwd}
                        />

                        <FormTextInput
                            type="password"
                            value={userDetails.matchPwd}
                            onChange={handleChange}
                            setFocus={handleFocus}
                            commonText="confirm_pwd"
                            title="Confirm Password"
                            valid={validMatch}
                            note="confirmnote"
                            name="matchPwd"
                            focus={focus.matchPwd}
                        />
                        <button  disabled={!checkDisable()}>Sign Up</button>
                        
                    </form>
                    <p>
                        Already registered? 
                        <span className="line">
                            {/*put router link here*/}
                            <Link to="/login">Sign In</Link>
                        </span>
                    </p>
                </section>
        </div>
    )
}

export default Register

