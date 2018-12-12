/* @flow strict-local */
import { connect } from 'react-redux';

import React, { PureComponent } from 'react';
import { View } from 'react-native';

import type { Context, PresenceState, User } from '../types';
import { Avatar } from '../common';
import { getRecipientsInGroupNarrow, getPresence } from '../selectors';

type Props = {
  recipients: User[],
  presence: PresenceState,
};

class TitleGroup extends PureComponent<Props> {
  context: Context;

  static contextTypes = {
    styles: () => null,
  };

  render() {
    const { styles } = this.context;
    const { recipients, presence } = this.props;

    return (
      <View style={styles.navWrapper}>
        {recipients.map((user, index) => (
          <View key={user.email} style={styles.titleAvatar}>
            <Avatar
              size={32}
              name={user.full_name}
              avatarUrl={user.avatar_url}
              email={user.email}
              presence={presence[user.email]}
            />
          </View>
        ))}
      </View>
    );
  }
}

export default connect((state, props) => ({
  recipients: getRecipientsInGroupNarrow(props.narrow)(state),
  presence: getPresence(state),
}))(TitleGroup);
