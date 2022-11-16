
//import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event){
    event.preventDefault()

    const response = await fetch('http://localhost:8000/api/register', {
    method: 'POST',  
    headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    })

    const data = await response.json()
    if (data.status === 'ok') {
			navigate('/login')
		}
  }

  return (
    <div>
        <div>
            <h3>REGISTER</h3>
            <form onSubmit={registerUser}> 
                <div>
                    <label for="email">Email</label>
                    <input 
                      value = {email}
                      onChange={(e) => setEmail(e.target.value)}
                      type='email'
                      id='email'/>
                </div>
                
                <div>
                    <label for="name">Name</label>    
                    <input 
                      value = {name}
                      onChange={(e) => setName(e.target.value)}
                      type='text'
                      id='name'/>
                </div>
                
                <div>
                    <label for="pass">Password</label>    
                    <input 
                      value = {password}
                      onChange={(e) => setPassword(e.target.value)}
                      type='text'
                      id='pass'/>
                </div>
                    
                <input type="submit" name="regSubmit" value="REGISTER" />
            </form>
        </div>
    </div>
  );
}

export default App;
