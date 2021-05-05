import { useEffect, useState } from 'react';
import TopBar from './TopBar';
import Messages from './Messages';
import MessageInput from './MessageInput';

import * as chatSelectors from '../../../core/redux/selectors/chat.selector';
import { removeChat } from '../../../core/redux/actions/chat.actions';
import * as userSelectors from '../../../core/redux/selectors/user.selectors';
import * as activeUsersSelectors from '../../../core/redux/selectors/active-users.selectors';
import { connect } from 'react-redux';

import { sendMessageToRoom, joinRoom } from '../../../core/services/chat.service';


const Main = props => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [toUser, setToUser] = useState();

    useEffect(() => {
        if ( props.room && props.currentUser && props.socket ) {
            const _toUser = props.room.participants.find( p => p._id !== props.currentUser._id );
            setToUser( _toUser );
            setMessages( props.room.messages.map( m => ( { ...m, mine: m.user !== _toUser._id } ) ) );

            joinRoom( props.room.name );
        }
    }, [props.room, props.socket, props.currentUser]);

    useEffect(() => {
        if ( props.socket && toUser ) {
            props.socket.on( 'sentMessageInRoom', data => {
                setMessages( [ ...messages, { ...data, mine: data.user !== toUser._id } ] )
            } );
        }
    }, [messages, toUser, props.socket ]);

    useEffect( () => {
        if ( props.activeUsers && toUser ) {
            if ( ! props.activeUsers.some( u => u._id === toUser._id ) ) {
                props.removeChat();
            }
        }
    }, [ props, toUser ] );

    const sendMessage = event => {
        event.preventDefault();

        if ( message && props.socket ) {
            sendMessageToRoom( { user: props.currentUser._id, toUser: toUser._id , text: message, name: props.room.name } );
            setMessage('');
        }
    };

    if ( !props.room ) {
        return (
            <>
                <div className="h-100-vh d-flex align-items-center justify-content-center">
                    <h5>Select a user to start chatting</h5>
                </div>
            </>
        )
    }

    return (
        <>
            <TopBar></TopBar>
            <Messages messages={messages}></Messages>
            <MessageInput setMessage={setMessage} sendMessage={sendMessage} message={message}></MessageInput>
        </>
    )

};

const select = state => {
    return {
        room: chatSelectors.chatDataSelector(state),
        status: chatSelectors.chatStatusSelector(state),
        error: chatSelectors.chatErrorSelector(state),
        currentUser: userSelectors.userDataSelector(state),
        activeUsers: activeUsersSelectors.activeUsersDataSelector(state)
    }
}

export default connect( select, { removeChat } )( Main );
