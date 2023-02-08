import MessageType from "./MessageType";

type ChatTextType = {
  sender: string;
  question?: string;
  message: MessageType;
};

export default ChatTextType;
