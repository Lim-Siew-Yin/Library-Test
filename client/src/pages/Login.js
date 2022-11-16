
//import './App.css';
import { useState } from 'react';

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(event){
    event.preventDefault()

    const response = await fetch('http://localhost:8000/api/login', {
    method: 'POST',  
    headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })

    const data = await response.json()
    if(data.user){
        localStorage.setItem('token', data.user)
        alert('login success')
        window.location.href = '/dashboard'
    }else{
        alert('invalid username or password')
    }
    console.log(data)
  }

  return (
    <div>
        <div>
            <h3>LOGIN</h3>
            <form onSubmit={loginUser}> 
                <div>
                    <label for="email" >Email</label>
                    <input 
                      value = {email}
                      onChange={(e) => setEmail(e.target.value)}
                      type='email'
                      id='email'/>
                </div>
                
                <div>
                    <label for="pass" >Password</label>    
                    <input 
                      value = {password}
                      onChange={(e) => setPassword(e.target.value)}
                      type='text'
                      id='pass'/>
                </div>
                    
                <input type="submit" name="regSubmit" value="LOGIN" />
            </form>
        </div>
    </div>
  );
}

export default App;
