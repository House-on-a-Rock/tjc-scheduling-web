import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions';

const Home = () => {
    const dispatch = useDispatch();
    return (
        <>
            I'm HOME BABY
            <button onClick={() => dispatch(logout())}>Log Out</button>
        </>
    );
};

export default Home;
