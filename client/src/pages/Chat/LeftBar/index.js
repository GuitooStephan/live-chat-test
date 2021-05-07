/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import ActiveUser from './ActiveUser';

import * as userSelectors from '../../../core/redux/selectors/user.selectors';
import * as activeUsersSelectors from '../../../core/redux/selectors/active-users.selectors';
import { setActiveUsers as setActiveUsersAction } from '../../../core/redux/actions/active-users.actions';
import { getUpdatedUser } from '../../../core/redux/actions/user.actions';


const LeftBar = props => {
    const [activeUsers, setActiveUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const { logout } = useAuth0();

    useEffect(() => {
        if ( props.data && props.socket ) {
            setCurrentUser( props.data );
            props.socket.on( 'appUsersUpdate', async data => {
                props.setActiveUsersAction( props.data._id );
            } );
            props.socket.on( 'blockUsersUpdate', async data => {
                props.setActiveUsersAction( props.data._id );
                props.getUpdatedUser( props.data._id );
            } );
        }
    }, [ props.socket ]);

    useEffect( () => {
        if ( props.activeUsers ) {
            setActiveUsers( props.activeUsers );
        }
    }, [ props.activeUsers ] );

    if ( !currentUser ) {
        return (
            <>
                <div className="my-5 d-flex justify-content-center align-items-center">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            </>
        );
    }

    const logMeOut = ( event ) => {
        event.preventDefault();

        props.socket.disconnect();
        logout({ returnTo: window.location.origin });
    }

    return (
        <>
            <div className="content">
                <div className="profile mb-5 d-flex align-items-center">
                    <Avatar alt="avatar" src={props.data.picture} />
                    <div className="ml-2">
                        <h6 className="font-weight-bold mb-1 font-size-14">{props.data.email}</h6>
                        <a href="/" className="small" onClick={ (event) => logMeOut( event ) }>
                            Logout
                        </a>
                    </div>
                </div>
                <h5 className="mb-4 title">Active</h5>
                { activeUsers.length ?
                    activeUsers.map( ( user, i ) => <ActiveUser key={i} user={user}></ActiveUser> ) :
                    <div className="empty-state"><h6>No users</h6></div>
                }
            </div>
        </>
    )
}


const select = state => {
    return {
        data: userSelectors.userDataSelector(state),
        activeUsers: activeUsersSelectors.activeUsersDataSelector(state)
    }
}

export default connect( select, { setActiveUsersAction, getUpdatedUser } )( LeftBar );
