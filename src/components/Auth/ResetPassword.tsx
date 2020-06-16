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
import { HttpError } from '../../shared/types/models';
import { useDispatch } from 'react-redux';
import { checkResetToken } from '../../store/actions';
import { useSelector } from '../../shared/types/useSelector';

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
    const dispatch = useDispatch();
    const { token } = useParams();

    const errorCode = useSelector(({ load }) => load.loadErrorStatus.AUTH);
    console.log(errorCode);

    useEffect(() => {
        // dispatch(checkResetToken('token'));
        // axios
        //     .get(secretIp + '/api/authentication/checkResetToken', {
        //         headers: {
        //             authorization:
        //                 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTAuMTAuMTUwLjUwOjgwODAvYXBpLyIsInN1YiI6InRqYy1zY2hlZHVsaW5nfDUiLCJleHAiOjE1OTI0MjI2NzksInR5cGUiOiJwd2RfcmVzZXQiLCJpYXQiOjE1OTIzMzYyNzl9.VW_qKiE4e5keG-emrVs4TRArFTnvy3dAaQvGHWlAhIgLnuxPZKQfUu9x6WIQUnm-qjfxW4G6umUcULFqB5ktf5NZazgjJ3HYVjzPuWy3NuSsDPQ6V5afA3mlfvRHXFVLZ77LH4_DiRFxjWiay-cAAMDdviwbd9UufBkO5LNMvIlZsxXv9DPvFiSIwVtO-Bmu-c_dLcnzyD0k7GdSyLqtzp72SmgK1BgK2YLdxpLhhETz0eZ5s8jPh0S41D5B0Dc9UbwF63erBp4AZRK6x1to002ToS6tpors6roxMCKnwPXfmKcBd_IOrZG_22yLzJABZRTrAPQljKbhIS95n_ozo34l3E0_lvKYnnsXUCWay2VfpHDa0qoW6xd4WT60VvZCFfn7MNH9DsMTdGLhBdp5okT7h0Ewl0NCjKipO30aCUMcGIK0WJKWb4qAT0vx_37qbNdExBEgY4WzZ_x8bG_KInwNtkuENXom_Z3L8VVdDRLZclny17_MHqnzt61RItk46ld0lK5T1yF-XVdXDLgdfc5lthuFD42Ccax02DA02g7fnYv5PtVJ192PhuuypWS5YKZlr-1Bt7RYKNLAEwxxghVuQkeTbgoX8AJasT-OH0l3-tLLibhyCg6qTsx_IelWbKGg0fuCrN0-gdXjAa_qJ_a83wPJJc2C3EPrF9LTU',
        //         },
        //     })
        //     .then((res) => {
        //         console.log('res', res);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {errorCode?.status !== 200 ? (
                <ChangePasswordForm />
            ) : (
                <ResendAuthEmail
                    message={errorCode?.message}
                    status={errorCode?.status}
                />
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
