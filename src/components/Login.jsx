import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateUsername = (username) => {
        return username.length >= 3;
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let valid = true;

        setUsernameError('');
        setPasswordError('');
        if (!validateUsername(username)) {
            setUsernameError('Username must be at least 3 characters long');
            valid = false;
        }


        if (!validatePassword(password)) {
            setPasswordError(' Password must be min 8 characters ');
   valid = false;
        }

 if (valid) {
            if (username === 'admin' && password === 'Admin@1234') {
  
                navigate('/home');
            } else {
                setPasswordError('Invalid username or password');
            }
        }
    };

    return (
        <div className="loginMain">
            <div className="login-container">
                <h2 className='my-0 p-0'>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                            placeholder="Username"
                        />
                        {usernameError && <small style={{ color: 'red' }}>{usernameError}</small>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Password"
                        />
                        {passwordError &&  <small style={{ color: 'red' }}>{passwordError}</small>}
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
