import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendAuthEmail } from '../../store/actions';
import { HttpError } from '../../shared/types/models';

// Material UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
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

export const ResendAuthEmail = ({ message, status }: HttpError) => {
    const dispatch = useDispatch();
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
                <Button onClick={() => dispatch(sendAuthEmail(email))}>
                    Resend Authentication Email
                </Button>
            </div>
        </>
    );
};
