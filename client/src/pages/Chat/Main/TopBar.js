/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Avatar } from '@material-ui/core';

import * as chatSelectors from '../../../core/redux/selectors/chat.selector';
import * as userSelectors from '../../../core/redux/selectors/user.selectors';

const TopBar = props => {
    const [receivingUser, setReceivingUser] = useState(null);
    const [room, setRoom] = useState(null);

    useEffect( () => {
        if ( props.room ) {
            setRoom( props.room );
            setReceivingUser( props.room.participants.find( p => p._id !== props.currentUser._id ) );
        }
    }, [ props.room ] );


    if ( !room ) {
        return (
            <></>
        )
    }


    return (
        <>
            <div className="top-bar text-light">
                <div className="mb-3 active-user d-flex align-items-center">
                    <Avatar alt="avatar" src={receivingUser.picture} />
                    <div className="ml-2">
                        <h6 className="font-weight-bold mb-1 font-size-14">{receivingUser.email}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}

const select = state => {
    return {
        room: chatSelectors.chatDataSelector(state),
        currentUser: userSelectors.userDataSelector(state)
    }
}

export default connect( select )( TopBar );
