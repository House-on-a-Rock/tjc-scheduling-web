import React from 'react';
import { useQuery } from '../../shared/helper_functions';
import { HttpError } from '../../shared/types/models';

export const ErrorPage = () => {
    const query = useQuery();

    console.log(query.get('message'), query.get('status'));
    return (
        <>
            You on a wrong page son {query.get('status')}: {query.get('message')}
        </>
    );
};
