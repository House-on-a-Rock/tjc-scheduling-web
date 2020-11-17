import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../shared/utilities';
import { Link as RouterLink, Redirect } from 'react-router-dom';

// Custom Components
import Copyright from '../shared/Copyright';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ValidatedTextField } from '../shared/ValidatedTextField';
import { useValidatedField } from '../shared/Hooks/useValidatedField';
import { VisiblePassword } from '../shared/VisiblePassword';
// Actions
import { checkCredentials } from '../../store/actions';

// Types
import { HttpError, PasswordState, ValidatedFieldState } from '../../shared/types/models';
import { PasswordForm } from '../shared';
import {
  setLocalStorageState,
  removeLocalStorageState,
  getLocalStorageState,
  isValidEmail,
} from '../../shared/utilities';

export const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const rememberedEmailState: ValidatedFieldState<string> = {
    value: getLocalStorageState('auth')?.email,
    valid: true,
    message: '',
  };

  const isLoggedIn: boolean = useSelector(({ auth }) => auth.isLoggedIn);
  const errorMessage: HttpError = useSelector(({ load }) => load.loadErrorStatus.AUTH);
  const loadState: string = useSelector(({ load }) => load.loadStatus.AUTH);

  const [remembered, setRemembered] = useState<boolean>(
    getLocalStorageState('auth') ? true : false,
  );

  const [email, setEmail, setEmailError, resetEmailError] = useValidatedField<string>(
    rememberedEmailState.value ? rememberedEmailState.value : '',
    'Please enter a valid email',
  );
  // const [
  //   password,
  //   setPassword,
  //   setPasswordError,
  //   resetPasswordError,
  // ] = useValidatedField<string>('', 'Please enter a password');

  const [password, setPassword] = useState<PasswordState>({
    value: '',
    valid: true,
    visible: false,
    message: null,
  });

  function handleLogin(event?: FormEvent<HTMLFormElement>): void {
    event?.preventDefault();
    setPassword({ ...password, valid: true, message: '' });
    resetEmailError();
    // resetPasswordError();
    if (isValidEmail(email.value) && password.value.length > 0) {
      dispatch(checkCredentials(email.value, password.value));
    } else {
      if (password.value.length === 0)
        setPassword({
          ...password,
          valid: false,
          message: 'Please enter a password',
        });
      // setPasswordError(password.value.length === 0)
      setEmailError(!isValidEmail(email.value) || email.value.length === 0);
    }
  }

  if (isLoggedIn) {
    remembered
      ? setLocalStorageState('auth', { email: email.value })
      : removeLocalStorageState('auth');
    // return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {errorMessage && (
          <Typography color="error">{`${errorMessage?.status}: ${errorMessage?.message}`}</Typography>
        )}

        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <ValidatedTextField
            label="Email Address"
            input={email}
            handleChange={setEmail}
            autoFocus
          />
          <PasswordForm
            name={'Password'}
            label={'Password'}
            password={password}
            handlePassword={setPassword}
          />
          {/* <ValidatedTextField
            label="Password"
            input={password}
            handleChange={setPassword}
            type={password.visible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <VisiblePassword
                  data={password}
                  handleVisible={(event) =>
                    handlePassword({
                      ...password,
                      visible: event,
                    })
                  }
                />
              ),
            }}
          /> */}

          <FormControlLabel
            control={<Checkbox value={remembered} color="primary" checked={remembered} />}
            label="Remember me"
            onChange={() => setRemembered(!remembered)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
            onClick={() => handleLogin()}
          >
            {loadState === 'LOADING' ? <CircularProgress /> : 'Sign In'}
          </Button>
          {/* HI TT */}
        </form>
      </div>

      <Grid container>
        <Grid item xs>
          <RouterLink to={`/auth/forgotPassword`}>Forgot password</RouterLink>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account?"}
          </Link>
        </Grid>
      </Grid>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      bottom: 0,
    },
  },
  paper: {
    marginTop: '20%',
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
