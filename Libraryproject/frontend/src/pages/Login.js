import React,{useState} from "react";
import axios from "axios";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const handleLogin = async ()=>{

 const res = await axios.post(
 "http://localhost:5000/api/auth/login",
 {
   email,
   password
 });

 localStorage.setItem("user",JSON.stringify(res.data));

 alert("Login successful");

 window.location.reload();

};

return(

<div className="login">

<h2>Login</h2>

<input
type="email"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>Login</button>

</div>

);

}

export default Login;