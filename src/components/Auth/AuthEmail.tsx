import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendAuthEmail } from '../../store/actions';
import { HttpError } from '../../shared/types/models';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

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

interface AuthEmailProps {
    data: AuthEmailDataProps;
    error?: HttpError;
}

interface AuthEmailDataProps {
    history: boolean;
    title: string;
    description?: string;
    type: string;
}

export const AuthEmail = ({ data, error }: AuthEmailProps) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [email, setEmail] = useState<string>('');
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {data.title}
                </Typography>
                {data.description ? <Typography>{data.description} </Typography> : null}
                {error ? (
                    <Typography>{`${error.status}: ${error.message}`}</Typography>
                ) : null}
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
                    {data.type}
                </Button>
                {data.history ? (
                    <Button onClick={() => history.goBack()}>Remember it?</Button>
                ) : null}
            </div>
        </Container>
    );
};
