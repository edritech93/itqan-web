import './css/login.css';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Card } from '@material-ui/core';
import { STORAGE } from '../../actions/types';

const useStyles = makeStyles({
  form: {
    marginBottom: 16,
  }
});

export default function Login(props) {
  const classes = useStyles();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const handleLogin = () => {
    if (username === 'admin' && password === '123qwe')  {
      localStorage.setItem(STORAGE.TOKEN, '123qwe')
      props.history.push('/home');
    } else {
      alert('salah username atau password')
    }
  }
  return (
    <div className="container">
      <Card className="form">
        <h1>Login</h1>
        <TextField id="outlined-basic" label="Username" variant="outlined" className={classes.form} onChange={(text) => setUsername(text)} />
        <TextField id="outlined-basic" label="Password" variant="outlined" className={classes.form} onChange={(text) => setPassword(text)} />
        <Button variant={"contained"} color={"primary"} onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
}
