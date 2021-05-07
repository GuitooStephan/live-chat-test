/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useReducer } from 'react';
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
    const [toUser, setToUser] = useState();
    const [messages, setMessages] = useReducer((messages, { type, value }) => {
        switch (type) {
            case "set":
                return [...value];
            case "add":
                return [...messages, value];
            default:
                return messages;
        }
    }, []);

    useEffect(() => {
        if ( props.room && props.currentUser && props.socket ) {
            const _toUser = props.room.participants.find( p => p._id !== props.currentUser._id );
            setToUser( _toUser );
            setMessages({ type: "set", value: props.room.messages.map( m => ( { text: m.text, user: m.user, mine: m.user !== _toUser._id } ) )});
            joinRoom( props.room.name );

            onSendMessage( _toUser );
        }
    }, [props.room]);

    useEffect( () => {
        if ( props.activeUsers && toUser ) {
            if ( ! props.activeUsers.some( u => u._id === toUser._id ) ) {
                props.socket.removeAllListeners('sentMessageInRoom');
                props.removeChat();
            }
        }
    }, [ props.activeUsers, toUser ] );

    const onSendMessage = _toUser => {
        props.socket.removeAllListeners('sentMessageInRoom');
        props.socket.on( 'sentMessageInRoom', data => {
            if ( props.room.name === data.room ) {
                setMessages( { type: "add", value: { text: data.text, user: data.user, mine: data.user !== _toUser._id } } );
            }
        } );
    };

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
