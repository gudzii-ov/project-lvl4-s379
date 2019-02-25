const prefix = '/api/v1';

// Send new message
// POST '/channels/:channelId/messages'
// { data: { attributes: { message } } }

// Fetch messages - via web-sockets on event 'newMessage'

// Add channel
// POST '/channels'
// { data: { attributes: { name } } }

export default {
  messagesUrl: channelId => [prefix, 'channels', channelId, 'messages'].join('/'),
  channelsUrl: () => [prefix, 'channels'].join('/'),
  channelActionUrl: channelId => [prefix, 'channels', channelId].join('/'),
};
