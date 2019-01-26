import { getNarrowFromNotificationData, handleNotificationMuddle } from '..';
import { HOME_NARROW, topicNarrow, privateNarrow, groupNarrow } from '../../utils/narrow';

describe('getNarrowFromNotificationData', () => {
  test('unknown notification data returns home narrow', () => {
    const notification = {};
    const narrow = getNarrowFromNotificationData(notification);
    expect(narrow).toEqual(HOME_NARROW);
  });

  test('recognizes stream notifications and returns topic narrow', () => {
    const notification = {
      recipient_type: 'stream',
      stream: 'some stream',
      topic: 'some topic',
    };
    const narrow = getNarrowFromNotificationData(notification);
    expect(narrow).toEqual(topicNarrow('some stream', 'some topic'));
  });

  test('on notification for a private message returns a PM narrow', () => {
    const notification = {
      recipient_type: 'private',
      sender_email: 'mark@example.com',
    };
    const narrow = getNarrowFromNotificationData(notification);
    expect(narrow).toEqual(privateNarrow('mark@example.com'));
  });

  test('on notification for a group message returns a group narrow', () => {
    const notification = {
      recipient_type: 'private',
      pm_users: '1,2,4',
    };
    const usersById = {
      '1': { email: 'me@example.com' },
      '2': { email: 'mark@example.com' },
      '4': { email: 'john@example.com' },
    };
    const expectedNarrow = groupNarrow(['me@example.com', 'mark@example.com', 'john@example.com']);

    const narrow = getNarrowFromNotificationData(notification, usersById);

    expect(narrow).toEqual(expectedNarrow);
  });

  test('do not throw when users are not found; return a home narrow', () => {
    const notification = {
      recipient_type: 'private',
      pm_users: '1,2,4',
    };
    const usersById = {};

    const narrow = getNarrowFromNotificationData(notification, usersById);

    expect(narrow).toEqual(HOME_NARROW);
  });
});

describe('handlePendingNotifications', () => {
  test('does not throw if `notificationData` value is not as expected', () => {
    expect(() => handleNotificationMuddle()).not.toThrow();
    expect(() => handleNotificationMuddle({})).not.toThrow();
  });

  test('if no data is extracted dispatch nothing', () => {
    const notificationData = { getData: () => undefined };
    const dispatch = jest.fn();

    handleNotificationMuddle(notificationData);

    expect(dispatch).not.toHaveBeenCalled();
  });

  test('if some data is passed dispatch a message', () => {
    const notificationData = { getData: () => ({}) };
    const dispatch = jest.fn();

    handleNotificationMuddle(notificationData, dispatch);

    expect(dispatch).toHaveBeenCalled();
  });
});
