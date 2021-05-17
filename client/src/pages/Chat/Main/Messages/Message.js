const Message = props => {
    return (
        <>
            <div className={`px-4 py-4 mb-2 message ${props.mine ? 'ml-auto bg-dark' : ''}`}>
                {props.text}
            </div>
        </>
    )
}

export default Message;
