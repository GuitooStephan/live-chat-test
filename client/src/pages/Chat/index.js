/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import LeftBar from './LeftBar';
import Main from './Main';

import { fetchUser } from '../../core/redux/actions/user.actions';
import * as userSelectors from '../../core/redux/selectors/user.selectors';
import { setTokenInterceptor } from '../../core/services/api.service';
import { connect as socketConnect, joinApp } from '../../core/services/chat.service';


const Chat = props => {
    const [ socket, setSocket ] = useState('');
    const { user, getAccessTokenSilently } = useAuth0();

    useEffect( () => {
        getAccessTokenSilently().then( token => {
            setTokenInterceptor( token );
            props.fetchUser( { picture: user.picture, email: user.email, name: user.name } );
        } );
    }, [] );

    useEffect( () => {
        if ( props.data ) {
            const socket = socketConnect();
            setSocket( socket );

            socket.once( 'connectedApp', () => {
                joinApp( user.email );
            } );
        }
    }, [ props.data, user ] );

    return (
        <>
            <div className="main">
                <div className="left text-light">
                    <LeftBar socket={socket} />
                </div>
                <div className="right position-relative">
                    <Main socket={socket} />
                </div>
            </div>
        </>
    )
}

const select = state => {
    return {
        data: userSelectors.userDataSelector(state),
        status: userSelectors.userStatusSelector(state),
        error: userSelectors.userErrorSelector(state)
    }
}

export default connect( select, { fetchUser } )( Chat )
