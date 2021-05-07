const MessageInput = props => {
    return (
        <>
            <div className="message-input-wrapper">
                <form className="message-input-form">
                    <div className="message-input">
                        <input
                            onChange={ event => props.setMessage( event.target.value ) }
                            onKeyPress={ event => event.key === 'Enter' ? props.sendMessage(event) : null }
                            type="text"
                            value={props.message}
                            className="form-control form-control-lg"/>
                    </div>
                    <button className="btn-lg btn btn-primary" onClick={ event => event.key === 'Enter' ? props.sendMessage(event) : null }>Send</button>
                </form>
            </div>
        </>
    )
}

export default MessageInput;
