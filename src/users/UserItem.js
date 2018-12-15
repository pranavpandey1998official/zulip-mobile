/* @flow strict-local */
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

import type { Context, Presence } from '../types';
import { Avatar, RawLabel, Touchable, UnreadCount } from '../common';
import { BRAND_COLOR } from '../styles';

const componentStyles = StyleSheet.create({
  selectedRow: {
    backgroundColor: BRAND_COLOR,
  },
  text: {
    marginLeft: 8,
  },
  selectedText: {
    color: 'white',
  },
  textEmail: {
    fontSize: 10,
    color: '#999',
  },
  textWrapper: {
    flex: 1,
  },
});

type Props = {|
  email: string,
  fullName: string,
  avatarUrl: ?string,
  presence?: Presence,
  isSelected: boolean,
  showEmail: boolean,
  unreadCount?: number,
  onPress: ({ email: string, fullName: string }) => void,
|};

export default class UserItem extends PureComponent<Props> {
  context: Context;

  static contextTypes = {
    styles: () => null,
  };

  static defaultProps = {
    isSelected: false,
    showEmail: false,
  };

  handlePress = () => {
    const { email, fullName, onPress } = this.props;
    if (email && fullName && onPress) {
      onPress({ email, fullName });
    }
  };

  render() {
    const { styles } = this.context;
    const { fullName, avatarUrl, presence, isSelected, unreadCount, showEmail, email } = this.props;

    return (
      <Touchable onPress={this.handlePress}>
        <View style={[styles.listItem, isSelected && componentStyles.selectedRow]}>
          <Avatar
            size={32}
            avatarUrl={avatarUrl}
            email={email}
            name={fullName}
            presence={presence}
            onPress={this.handlePress}
          />
          <View style={componentStyles.textWrapper}>
            <RawLabel
              style={[componentStyles.text, isSelected && componentStyles.selectedText]}
              text={fullName}
              numberOfLines={1}
              ellipsizeMode="tail"
            />
            {showEmail && (
              <RawLabel
                style={[
                  componentStyles.text,
                  componentStyles.textEmail,
                  isSelected && componentStyles.selectedText,
                ]}
                text={email}
                numberOfLines={1}
                ellipsizeMode="tail"
              />
            )}
          </View>
          <UnreadCount count={unreadCount} inverse={isSelected} />
        </View>
      </Touchable>
    );
  }
}
