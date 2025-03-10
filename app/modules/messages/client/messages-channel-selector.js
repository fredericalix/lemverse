const show = () => Session.get('console') && !Session.get('quests');

const allChannels = () => {
  if (!show()) return [];

  const user = Meteor.user();
  if (!user) return [];

  const sortedZones = zones.currentZones(Meteor.user()).map(zone => ({ _id: zone._id, name: zone.name }));
  const nearUsers = nearUserIdsToString();
  let nearUsersChannel;
  if (nearUsers.length) nearUsersChannel = { _id: nearUsers, name: 'Near users' };

  return [...sortedZones, nearUsersChannel].filter(Boolean);
};

Template.messagesChannelSelector.events({
  'click .js-channel-selector'(event) {
    event.preventDefault();
    event.stopPropagation();

    const { channelId } = event.currentTarget.dataset;
    messagesModule.changeMessagesChannel(channelId);
  },
});

Template.messagesChannelSelector.helpers({
  show() { return show(); },
  channels() { return allChannels().sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())); },
  active() { return Session.get('messagesChannel') === this._id; },
});
