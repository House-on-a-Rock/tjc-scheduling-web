import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../shared/types/useSelector';
import { Link as RouterLink, Redirect } from 'react-router-dom';

// Custom Components
import Copyright from '../shared/Copyright';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

// Actions
import {
    rememberMe,
    updateAuthState,
    forgetMe,
    checkCredentials,
} from '../../store/actions';
import { HttpError } from '../../shared/types/models';

export const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const email: string = useSelector(({ auth }) => auth.email);
    const password: string = useSelector(({ auth }) => auth.password);
    const remembered: boolean = useSelector(({ auth }) => auth.remembered);
    const isLoggedIn: boolean = useSelector(({ auth }) => auth.isLoggedIn);
    const errorMessage: HttpError = useSelector(({ load }) => load.loadErrorStatus.AUTH);

    function handleLogin() {
        dispatch(checkCredentials(email, password));
    }

    if (isLoggedIn) {
        remembered ? dispatch(rememberMe({ email: email })) : dispatch(forgetMe());
        // dispatch prepHomePage
        return <Redirect to="/" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                {errorMessage ? (
                    <Typography color="error">{`${errorMessage?.status}: ${errorMessage?.message}`}</Typography>
                ) : null}

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        value={email}
                        name="email"
                        autoComplete="email"
                        onChange={(event) =>
                            dispatch(updateAuthState({ email: event.target.value }))
                        }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={password}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) =>
                            dispatch(updateAuthState({ password: event.target.value }))
                        }
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={remembered}
                                color="primary"
                                checked={remembered}
                            />
                        }
                        label="Remember me"
                        onChange={() =>
                            dispatch(updateAuthState({ remembered: !remembered }))
                        }
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <RouterLink to={`/auth/forgotPassword`}>
                                Forgot password
                            </RouterLink>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account?"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

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
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
