import { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchChat, removeChat } from '../../../core/redux/actions/chat.actions';
import { blockUser, unblockUser } from '../../../core/services/user.service';

import * as userSelectors from '../../../core/redux/selectors/user.selectors';

const ActiveUser = props => {
    const [blocked, setBlocked] = useState(false);


    const selectChat = () => {
        props.fetchChat( { participantOneId: props.user._id, participantTwoId: props.currentUser._id } );
    };

    const block = async event => {
        event.preventDefault();
        await blockUser( props.currentUser._id, { id: props.user._id } );
        props.removeChat();
    };

    const unblock = async event => {
        event.preventDefault();
        await unblockUser( props.currentUser._id, { id: props.user._id } );
        props.removeChat();
    };

    useEffect( () => {
        if ( props.user && props.currentUser ) {
            setBlocked(props.currentUser.blockedUsers.some( id => id === props.user._id ) );
        }
    }, [ props.user, props.currentUser ] );

    if ( blocked ) {
        return (
            <>
                <div className="mb-3 active-user d-flex align-items-center">
                    <Avatar alt="avatar" src={props.user.picture} />
                    <div className="ml-2">
                        <h6 className="font-weight-bold mb-1 font-size-14">{props.user.email}</h6>
                        <a href="/" onClick={ event => unblock(event) } className="small text-danger block-button">
                            unblock
                        </a>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="mb-3 active-user d-flex align-items-center">
                <Avatar alt="avatar" src={props.user.picture} />
                <div className="ml-2">
                    <h6 className="font-weight-bold mb-1 font-size-14 email" onClick={ event => selectChat() }>{props.user.email}</h6>
                    <a href="/" onClick={ event => block(event) } className="small text-danger block-button">
                        block
                    </a>
                </div>
            </div>
        </>
    )
}

const select = state => {
    return {
        currentUser: userSelectors.userDataSelector(state)
    }
}

export default connect( select, { fetchChat, removeChat } )( ActiveUser )

