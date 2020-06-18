import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { validateResetToken } from '../../store/actions';
import { useSelector } from '../../shared/types/useSelector';

// Material UI
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

// Custom components
import { useQuery } from '../../shared/helper_functions';
import LoadingPage from '../../components/shared/LoadingPage';
import { ResendAuthEmail, ChangePassword } from '../../components/Auth';

export const ResetPassword = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const token = query.get('token');

    const isLoading = useSelector(({ load }) => load.loadStatus.AUTH === 'LOADING');
    const tokenError = useSelector(({ load }) => load.loadErrorStatus.AUTH);

    useEffect(() => {
        dispatch(validateResetToken(token));
    }, []);

    return isLoading ? (
        <LoadingPage />
    ) : (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {tokenError ? (
                <ResendAuthEmail
                    message={tokenError?.message}
                    status={tokenError?.status}
                />
            ) : (
                <ChangePassword token={token} />
            )}
        </Container>
    );
};
