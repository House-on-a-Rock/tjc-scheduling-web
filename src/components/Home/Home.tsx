import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions';

export const Home = () => {
    const dispatch = useDispatch();
    return (
        <>
            I'm HOME BABY
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
