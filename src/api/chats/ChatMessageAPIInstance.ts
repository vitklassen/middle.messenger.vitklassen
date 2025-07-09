import HTTP from '../../services/HTTPTransport';

const chatMessageAPIInstance = new HTTP('/chats');
export default chatMessageAPIInstance;
