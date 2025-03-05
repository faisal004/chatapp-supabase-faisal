interface Params {
    id: string;
}

const ChatPage = ({ params }: { params: Params }) => {
    return (<div>
        {params.id}
    </div>);
}

export default ChatPage;