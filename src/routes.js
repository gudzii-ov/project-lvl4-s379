const prefix = '/api/v1';

// Send new message
// POST '/channels/:channelId/messages'
// { data: { attributes: { message } } }

// Fetch messages - via web-sockets on event 'newMessage'

export default {
  messagesUrl: channelId => [prefix, 'channels', channelId, 'messages'].join('/'),
};
