import React from 'react';
import { useHistory } from 'react-router-dom';

// Material UI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(25),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    buttonRow: { display: 'flex', justifyContent: 'space-between' },
}));

const ForgotPassword = () => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Forgot Password
                </Typography>
                <Typography>
                    Lost your password? Please enter your email address. You will receive
                    a link to create a new password via email.
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    ></TextField>
                </form>
            </div>
            <div className={classes.buttonRow}>
                <Button onClick={() => history.goBack()}>Reset Password</Button>
                <Button onClick={() => history.goBack()}>Remember it?</Button>
            </div>
        </Container>
    );
};

export default ForgotPassword;
