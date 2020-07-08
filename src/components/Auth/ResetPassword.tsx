import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import zxcvbn, { ZXCVBNResult } from 'zxcvbn';

// Custom
import { resetPassword } from '../../store/actions';
import { TransitionsModal } from '../shared/TransitionsModal';
import { PasswordStrengthMeter, PasswordForm } from '../shared';
import { PasswordState } from '../../shared/types/models';
import { useQuery } from '../../shared/helper_functions';

// Material UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

export const ResetPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const token = query.get('token');

  const [password, setPassword] = useState<PasswordState>({
    value: '',
    valid: true,
    visible: false,
    message: null,
  });
  const [confirmPassword, setConfirmPassword] = useState<PasswordState>({
    value: '',
    valid: true,
    visible: false,
    message: null,
  });
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const testedResult: ZXCVBNResult = zxcvbn(password.value);

  function onHandlePassword(newPassword: PasswordState): void {
    if (!password.valid) {
      setPassword({
        ...password,
        valid: true,
        message: '',
        value: newPassword.value,
      });
    } else
      setPassword({
        ...password,
        value: newPassword.value,
        visible: newPassword.visible,
      });
  }
  function onHandleConfirmPassword(newConfirmPassword: PasswordState): void {
    if (!confirmPassword.valid)
      setConfirmPassword({
        ...confirmPassword,
        valid: true,
        message: '',
        value: newConfirmPassword.value,
      });
    else
      setConfirmPassword({
        ...confirmPassword,
        value: newConfirmPassword.value,
        visible: newConfirmPassword.visible,
      });
  }

  function createPasswordLabel(result: ZXCVBNResult): string {
    switch (result.score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  }
  function submitNewPassword(
    newPasswordValue: string,
    confirmPasswordValue: string,
    event?: FormEvent<HTMLFormElement>,
  ): void {
    event?.preventDefault();
    if (newPasswordValue.length === 0)
      setPassword({
        ...password,
        valid: false,
        message: 'Please enter a password',
      });

    if (confirmPasswordValue.length === 0)
      setConfirmPassword({
        ...confirmPassword,
        valid: false,
        message: 'Please enter a password',
      });
    else if (newPasswordValue !== confirmPasswordValue) {
      setPasswordMessage("Passwords aren't the same");
      setPassword({
        ...password,
        value: '',
      });
      setConfirmPassword({
        ...confirmPassword,
        value: '',
      });
    } else if (createPasswordLabel(testedResult) === 'Weak') {
      setPassword({ ...password, value: '' });
      setConfirmPassword({
        ...confirmPassword,
        value: '',
      });
      setPasswordMessage('Please enter a stronger password');
    } else {
      setOpenModal(true);
      dispatch(resetPassword(token, newPasswordValue));
      setPassword({ ...password, value: '', valid: true, message: '' });
      setConfirmPassword({
        ...confirmPassword,
        value: '',
        valid: true,
        message: '',
      });
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <TransitionsModal
        open={openModal}
        setOpen={setOpenModal}
        description={"You've successfully changed your password!"}
      />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {passwordMessage ? (
          <Typography color="error">{passwordMessage}</Typography>
        ) : (
          <Typography>Type in your new password</Typography>
        )}

        <form
          className={classes.form}
          noValidate
          onSubmit={(event) =>
            submitNewPassword(password.value, confirmPassword.value, event)
          }
        >
          <PasswordForm
            name={'password'}
            label={'New Password'}
            password={password}
            handlePassword={onHandlePassword}
          />
          <PasswordStrengthMeter
            password={password.value}
            strength={createPasswordLabel(testedResult)}
            testedResult={testedResult}
          />
          <PasswordForm
            name={'confirm_password'}
            label={'Confirm Password'}
            password={confirmPassword}
            handlePassword={onHandleConfirmPassword}
          />
          <div className={classes.buttonRow}>
            <Button
              type="submit"
              onSubmit={() => submitNewPassword(password.value, confirmPassword.value)}
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonRow: { display: 'flex', justifyContent: 'space-between' },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
}));
