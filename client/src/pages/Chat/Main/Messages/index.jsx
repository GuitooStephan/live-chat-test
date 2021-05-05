import { useRef, useEffect } from 'react';
import Message from './Message';

const Messages = props => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom();
    }, [props.messages]);

    return (
        <>
            <div className="messages-wrapper">
                { props.messages.map( ( m, i ) => <Message key={i} {...m}></Message> ) }
                <div ref={messagesEndRef} />
            </div>
        </>
    )
}

export default Messages;