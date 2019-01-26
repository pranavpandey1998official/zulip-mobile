/* @flow */
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import { TextAvatar, RawLabel, Touchable, UnreadCount } from '../common';
import styles from '../styles';

const componentStyles = StyleSheet.create({
  text: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
});

type Props = {|
  email: string,
  usersByEmail: Object,
  unreadCount: number,
  onPress: (emails: string) => void,
|};

/**
 * A list item describing one group PM conversation.
 * */
export default class GroupPmConversationItem extends PureComponent<Props> {
  handlePress = () => {
    const { email, onPress } = this.props;
    onPress(email);
  };

  render() {
    const { email, usersByEmail, unreadCount } = this.props;
    const allUsers = email.split(',').map(e => usersByEmail[e]);

    const allUsersFound = allUsers.every(user => user);

    if (!allUsersFound) {
      return null;
    }

    const allNames = allUsers.map(user => user.full_name).join(', ');

    return (
      <Touchable onPress={this.handlePress}>
        <View style={styles.listItem}>
          <TextAvatar size={32} name={allNames} />
          <RawLabel
            style={componentStyles.text}
            numberOfLines={2}
            ellipsizeMode="tail"
            text={allNames}
          />
          <UnreadCount count={unreadCount} />
        </View>
      </Touchable>
    );
  }
}
