import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions';

export const Home = () => {
    const dispatch = useDispatch();
    return (
        <>
            <button
                onClick={() => {
                    // remove from local storage
                    dispatch(logout());
                }}
            >
                Log Out
            </button>
        </>
    );
};
