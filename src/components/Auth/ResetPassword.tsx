import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { validateResetToken, sendResetEmail } from '../../store/actions';
import { useSelector } from '../../shared/types/useSelector';
import { HttpError } from '../../shared/types/models';

// Material UI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

// Custom components
import LoadingPage from '../shared/LoadingPage';

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

const ResetPassword = () => {
    const dispatch = useDispatch();
    const { token } = useParams();

    const isLoading = useSelector(({ load }) => load.loadStatus.AUTH === 'LOADING');
    const errorCode = useSelector(({ load }) => load.loadErrorStatus.AUTH);

    useEffect(() => {
        dispatch(validateResetToken('token'));
    }, []);

    return isLoading ? (
        <LoadingPage />
    ) : (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {errorCode ? (
                <ResendAuthEmail
                    message={errorCode?.message}
                    status={errorCode?.status}
                />
            ) : (
                <ChangePasswordForm />
            )}
        </Container>
    );
};

const ResendAuthEmail = ({ message, status }: HttpError) => {
    const classes = useStyles();
    const [email, setEmail] = useState<string>('');
    return (
        <>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Resend authentication email
                </Typography>
                <Typography>{`${status}: ${message}`}</Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    ></TextField>
                </form>
            </div>
            <div className={classes.buttonRow}>
                <Button onClick={() => sendResetEmail(email)}>
                    Resend Authentication Email
                </Button>
            </div>
        </>
    );
};

const ChangePasswordForm = () => {
    const classes = useStyles();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    return (
        <>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Typography>Type in your new password</Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        id="password"
                        label="New Password"
                        name="Password"
                        autoFocus
                    ></TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        id="confirmPassword"
                        label="Confirm Password"
                        name="Confirm Password"
                    ></TextField>
                </form>
            </div>
            <div className={classes.buttonRow}>
                <Button
                // onClick={() => history.goBack()}
                >
                    Reset Password
                </Button>
            </div>
        </>
    );
};

export default ResetPassword;
