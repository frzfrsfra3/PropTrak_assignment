import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOwnerChats,
  addOwnerRecentMessage,
  markChatAsRead
} from "../../features/ownerUser/ownerUserSlice";
import { PageLoading, ChatUsers, ChatMessages } from "../../components";
import { socket } from "../../socket";
import { SocketContext } from "../../utils/SocketContext";

const OwnerChat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { socketMessage } = useContext(SocketContext);

  const { isLoading, chats } = useSelector((state) => state.ownerUser);
  const { user } = useSelector((state) => state.auth);
  
  const [currentChat, setCurrentChat] = useState(null);
  const [currentSelectedChatIndex, setCurrentChatIndex] = useState(null);

  // Fetch chats on component mount
  useEffect(() => {
    dispatch(getOwnerChats());
  }, [dispatch]);

  // Set the current chat from location state if it exists
  useEffect(() => {
    if (location?.state) {
      handleCurrentChatChange(location.state);
    }
  }, [location.state]);

  // Handle incoming socket messages
  useEffect(() => {
    if (socketMessage) {
      dispatch(
        addOwnerRecentMessage({
          chatId: socketMessage?.from,
          message: socketMessage?.message,
          sender: socketMessage?.from,
        })
      );
    }
  }, [socketMessage, dispatch]);

  const handleCurrentChatChange = (chat) => {
    if (!chat || !user?._id) return;

    socket?.emit("markAsRead", {
      receiverID: user._id,
      senderId: chat._id,
    });

    setCurrentChat(chat);
    setCurrentChatIndex(chat._id);
    dispatch(markChatAsRead({ chatId: chat._id }));
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (chats?.length === 0) {
    return (
      <div className="flex items-center justify-center mt-12">
        <h3 className="text-center text-gray-600 font-medium">
          No chat available. Add a contact to start chatting.
        </h3>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Chat</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-md p-4">
        {/* Chat List */}
        <div className="w-full md:w-1/3 border-r border-gray-200 pr-4">
          <div className="overflow-y-auto max-h-[500px] space-y-2">
            {chats?.map((chat) => (
              <div
                key={chat._id}
                onClick={() => handleCurrentChatChange(chat)}
                className={`cursor-pointer rounded-lg transition-colors ${
                  currentSelectedChatIndex === chat._id ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <ChatUsers chat={chat} currentUser={user} />
              </div>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 min-h-[400px]">
          {!currentChat ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="text-gray-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600">
                Select a chat to start messaging
              </h3>
              <p className="text-gray-500 mt-1">
                Choose from your contacts on the left
              </p>
            </div>
          ) : (
            <ChatMessages
              chat={currentChat}
              currentUser={user}
              handleCurrentChatChange={handleCurrentChatChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerChat;