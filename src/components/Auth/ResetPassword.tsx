import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Material UI
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { secretIp } from '../../../secrets/secretStuff';

interface Error {
    status: number;
    message: string;
}

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
    const classes = useStyles();
    const { token } = useParams();
    const [errorCode, setErrorCode] = useState<Error>({ status: 200, message: '' });
    console.log(errorCode);

    useEffect(() => {
        axios
            .get(secretIp + '/api/authentication/checkResetToken', {
                headers: {
                    authorization:
                        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTAuMTAuMTUwLjUwOjgwODAvYXBpLyIsInN1YiI6InRqYy1zY2hlZHVsaW5nfDUiLCJleHAiOjE1OTIyNzIwMzMsInR5cGUiOiJwd2RfcmVzZXQiLCJpYXQiOjE1OTIyNjQ4MzN9.sdmy1PzEZrDN-VvnXR_ir8nwuIKmPGExjGxISlDXtTeZGKjN9LV04bT5V5wVpPXvp0ZPk6zeswow0NnbCIAdbXe6YOdsqBnbIAiODCkZEpAOrmTe4S_1qvyy79R3f-kOh0VtoIGDzYJ-o1KjoWK96y14iv67lweJKEaE0rOKT_yp7lmzIBJWziCYqLj--09bqdYuv46zuZAp3Hm9utS0FT9yp4DuVHr16SaMA7ZqRZeYOEhSDVSy1j1HUYZ-rKk4lqpO85iCssihp9ESZWDyX_zsCR7ZFxOyMfBngxnFPrABVYzBXxgvoZLIsz00kDGrhsSmBh1uMrz_sKvcQuFIAyRGJXyiJh2S8iKOnidBDfX1DyO3Uw-rs4OR6Tbe7muzyc4r4YT4gfwNdcQjnMyDMSOylXXJQBQtoOrah5_u25VnpUGH3RDt1Bi8O2N8QpWyMHgZ2t4jGvqdVA7rEdbrVBUvW0Zgp_VhJwi5HG05XU7OUbP38NTZNJ2vUnTdvLdLFKt_YWSIQi_YcI-aK-rZXaG5DHuNFw7yye6rVXKqjzBhJ7gtIfWNQLBVABA9v7iwSWK2ZBJaqzOzoadyERplRaYjjH_VQkqMQ1MULD0DdG6Gvvlj_PjTSjTTkyc4vZb6o0_T3fiiNnG1m0-T-fM4VZJvUoshYVb8lxRMY5-B0EE',
                },
            })
            .then((res) => {
                console.log(res);
                setErrorCode({ status: res.status, message: res.statusText });
            })
            .catch((error) => {
                console.error(error.response);
                // setErrorCode({
                //     status: error.response.status,
                //     message: error.response.statusText,
                // });
                setErrorCode({
                    status: 200,
                    message: 'YOU WERE REJECTED',
                });
            });
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {errorCode.status !== 200 ? (
                <ChangePasswordForm />
            ) : (
                <ResendAuthEmail message={errorCode.message} status={errorCode.status} />
            )}
        </Container>
    );
};

const ResendAuthEmail = ({ message, status }: Error) => {
    const classes = useStyles();
    const [email, setEmail] = useState<string>('');
    return (
        <>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Resend authentication email
                </Typography>
                <Typography>{message}</Typography>
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
                <Button
                // onClick={() => history.goBack()}
                >
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
                        autoFocus
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
