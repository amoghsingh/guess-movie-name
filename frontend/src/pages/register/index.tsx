import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "../../components/themeSwitch";
import { Api } from "../../services/Api";
import TitleImage from "../../components/titleImage";

const Register = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [msg, setMsg] = useState<string>("");
    const navigate = useNavigate();    

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            name==="username"?setUsername(value):setPassword(value);
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Api.post('/register',{username, password}).then((res)=>{
            console.log("register response : ", res);
            setMsg(res.data.message);
            setTimeout(()=>{navigate('/login')},2000);

        }).catch((error)=>{
            if(error.status === "409"){
                setMsg(error.response.data.message);
            }
            console.log("Register error : ", error)});
    }

  return (
    <>
    <TitleImage  width="700"/>
    <div className="wrapper">
    <h2>Register</h2>
    <ThemeSwitch />
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="">Username</label>
            <div><input type="text" name="username" value={username} onChange={handleChange} /></div>
        </div>
        <div className="form-group">
            <label htmlFor="">Password</label>
            <div><input type="password" name="password" value={password} onChange={handleChange}  /></div>
        </div>
        <input type="submit" value="Register" className="submit-btn"/>
        {msg? <div>{msg}</div>:null}
    </form>
    </div>
    </>
  )
}

export default Register