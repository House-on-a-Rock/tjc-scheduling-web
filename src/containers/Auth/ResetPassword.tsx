import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { validateResetToken } from '../../store/actions';
import { useSelector } from '../../shared/types/useSelector';

// Custom components
import { useQuery } from '../../shared/helper_functions';
import { LoadingPage } from '../../components/shared';
import { AuthEmail, NewPassword } from '../../components/Auth';

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
    ) : tokenError ? (
        <AuthEmail
            data={{
                history: false,
                title: 'Resend Authentication Email',
                type: 'Resend Authentication Email',
            }}
            error={tokenError}
        />
    ) : (
        <NewPassword token={token} />
    );
};
