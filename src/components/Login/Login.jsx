import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  
const Login = () => {
  const classes = useStyles();

  return (
    <div className="login__wrapper">
       <h1>Hey, how you doing?</h1>
       <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <TextField id="outlined-basic" label="Room" variant="outlined" />
      </form>
    </div>
  );
}

export default Login;
