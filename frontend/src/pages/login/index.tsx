import { useState } from "react";
import { Api } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/context";
import TitleImage from "../../components/titleImage";

const Login = () => {
      const [username, setUsername] = useState<string>("");
      const [password, setPassword] = useState<string>("");
      const [msg, setMsg] = useState<string>("");
      const navigate = useNavigate();
      const {setAccessToken} =  useAuthContext();

 const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            name==="username"?setUsername(value):setPassword(value);
    }

      const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
            Api.post('/login',{username, password}).then((res)=>{
                console.log("login response : ", res);
                res.data.accesstoken && setAccessToken(res.data.accesstoken);
                navigate('/');
    
            }).catch((error)=>{
                if(error.status === 409){
                    setMsg(error.response.data.message);
                    return;
                }

                if(error.status === 404){
                    setMsg("User not found! Either enter correct credentials or sign up.");
                }


                console.log("login error : ", error)});
        }

  return (
    <>
    <TitleImage  width="700"/>
    
    <div className="wrapper">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="">Username</label>
            <div><input type="text" name="username" placeholder="enter username" value={username} onChange={handleChange} /></div>
        </div>
        <div className="form-group">
            <label htmlFor="">Password</label>
            <div><input type="password" name="password" placeholder="enter password" value={password} onChange={handleChange}  /></div>
        </div>
        <input type="submit" value="Login" className="submit-btn" />
        {msg? <div className="error">{msg}</div>:null}
    </form>
    </div>
    </>
  )
}

export default Login