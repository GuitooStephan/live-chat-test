import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';

import LeftBar from './LeftBar';
import Main from './Main';

import { fetchUser } from '../../core/redux/actions/user.actions';
import * as userSelectors from '../../core/redux/selectors/user.selectors';
import { setTokenInterceptor } from '../../core/services/api.service';
import { connect as socketConnect, joinApp, disconnect } from '../../core/services/chat.service';

const Chat = props => {
    const [ token, setToken ] = useState('');
    const [ socket, setSocket ] = useState('');
    const { user, getAccessTokenSilently } = useAuth0();

    useEffect( () => {
        const init = async () => {
            const token = await getAccessTokenSilently();
            setToken( token );
        };

        init();
    }, [] );

    useEffect( () => {
        if ( user && token ) {
            setTokenInterceptor( token );
            props.fetchUser( { picture: user.picture, email: user.email, name: user.name } );
        }
    }, [ token, user ] );

    useEffect( () => {
        if ( props.data ) {
            const socket = socketConnect();
            setSocket( socket );

            socket.on( 'connectedApp', () => {
                joinApp( user.email );
            } );
        }
        return () => {
            disconnect();
        };
    }, [ props, user ] );

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
