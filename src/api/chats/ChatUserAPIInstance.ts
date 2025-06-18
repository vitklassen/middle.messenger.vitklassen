import HTTP from '../../services/HTTPTransport';

const chatUserAPIInstance = new HTTP('/chats/users');
export default chatUserAPIInstance;
