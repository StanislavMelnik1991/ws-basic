export type Message = {
  event: 'message' | 'connection',
  username: string
  id: number,
  message?: string,
};
