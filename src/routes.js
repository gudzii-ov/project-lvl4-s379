const prefix = '/api/v1';

export default {
  messagesUrl: channelId => [prefix, 'channels', channelId, 'messages'].join('/'),
};
