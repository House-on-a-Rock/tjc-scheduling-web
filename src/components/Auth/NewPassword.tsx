import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../store/actions';
import { TransitionsModal } from '../shared/TransitionsModal';
import { VisiblePassword } from '../shared';

// Material UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

interface NewPasswordProps {
    token: string;
}

export interface PasswordState {
    value: string;
    visible: boolean;
}

export const NewPassword = ({ token }: NewPasswordProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [password, setPassword] = useState<PasswordState>({
        value: '',
        visible: false,
    });
    const [confirmPassword, setConfirmPassword] = useState<PasswordState>({
        value: '',
        visible: false,
    });
    const [areEquivalent, setAreEquivalent] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);

    function submitNewPassword(newPassword: string, confirmPassword: string) {
        if (newPassword !== confirmPassword)
            setAreEquivalent("Passwords aren't the same");
        else {
            dispatch(resetPassword(token, newPassword));
            setOpenModal(true);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <TransitionsModal open={openModal} setOpen={setOpenModal} />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                {areEquivalent ? (
                    <Typography color="error">{areEquivalent}</Typography>
                ) : (
                    <Typography>Type in your new password</Typography>
                )}

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={password.value}
                        onChange={(event) =>
                            setPassword({ ...password, value: event.target.value })
                        }
                        id="password"
                        label="New Password"
                        name="Password"
                        type={password.visible ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <VisiblePassword
                                    data={password}
                                    handleVisible={(event) =>
                                        setPassword({
                                            ...password,
                                            visible: event,
                                        })
                                    }
                                />
                            ),
                        }}
                    ></TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={confirmPassword.value}
                        onChange={(event) =>
                            setConfirmPassword({
                                ...confirmPassword,
                                value: event.target.value,
                            })
                        }
                        id="confirmPassword"
                        label="Confirm Password"
                        name="Confirm Password"
                        type={confirmPassword.visible ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <VisiblePassword
                                    data={confirmPassword}
                                    handleVisible={(event) =>
                                        setConfirmPassword({
                                            ...confirmPassword,
                                            visible: event,
                                        })
                                    }
                                />
                            ),
                        }}
                    ></TextField>
                </form>
            </div>
            <div className={classes.buttonRow}>
                <Button
                    onClick={() =>
                        submitNewPassword(password.value, confirmPassword.value)
                    }
                >
                    Reset Password
                </Button>
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
}));
