import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { validateResetToken } from '../../store/actions';
import { useSelector } from '../../shared/types/useSelector';

// Custom components
import { useQuery } from '../../shared/helper_functions';
import { NewPassword } from '../../components/Auth';

export const ResetPassword = () => {
    const query = useQuery();
    const token = query.get('token');

    return <NewPassword token={token} />;
};
