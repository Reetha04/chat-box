import ChatInput from '@/Components/Chat/ChatInput';
import ChatMessages from '@/Components/Chat/ChatMessages';
import ChatSidebar from '@/Components/Chat/ChatSidebar';
import ChatUserInfoHeader from '@/Components/Chat/ChatUserInfoHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UserList from '@/Components/Chat/UserList'; 


export default function Chat(props) {
    const allUsers = [];
    const {auth,errors,recentMessages,receiver,messages}=props;
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            user={props.auth.user}
        >
            <div className="py-12">
                <div className="messanger p-4 h-screen overflow-hidden">
                    <div className="flex">
                        <div className="basis-2/6 pt-3 bg-white border-r border-slate-100">
                            <ChatSidebar recentMessages={recentMessages} > <UserList users={allUsers} /></ChatSidebar>
                        </div>

                        <div className="basis-4/6">
                            {props.receiver?.id ? (
                                <>
                                    <div className="">
                                        <ChatUserInfoHeader receiver={receiver} />
                                        <div className="message-area mt-4 px-4">
                                        <ChatMessages messages={messages} auth_id={auth.user.id} />
                                        </div>
                                        <ChatInput receiver={receiver}/>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-center items-center bg-slate-100 h-screen">
                                    <p className="font-bold text-3xl text-gray-500">Please select a user to start chatting...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
