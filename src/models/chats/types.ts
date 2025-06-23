export type TGetChatRequest = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type TGetChatResponse = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string,
      email: string,
      login: string,
      phone: string
    },
    time: string,
    content: string,
  }
};

export type TDeleteChatRequest = {
  chatId: number;
};

export type TDeleteChatResponse = {
  userId: number,
  result: {
    id: number,
    title: string,
    avatar: string,
    created_by: number,
  }
      
};

export type TCreateChatRequest = {
  title: string;
};

export type TCreateChatResponse = {
  id: number;
};

export type TUserActionRequest = {
  users: number[],
  chatId: number,
};
