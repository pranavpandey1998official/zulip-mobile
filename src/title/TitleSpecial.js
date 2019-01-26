/* @flow strict-local */
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import type { Narrow } from '../types';
import { Label } from '../common';
import Icon from '../common/Icons';
import styles from '../styles';

const specials = {
  home: { name: 'All messages', icon: 'home' },
  private: { name: 'Private messages', icon: 'mail' },
  starred: { name: 'Starred', icon: 'star' },
  mentioned: { name: 'Mentions', icon: 'at-sign' },
};

type Props = {|
  narrow: Narrow,
  color: string,
|};

export default class TitleSpecial extends PureComponent<Props> {
  render() {
    const { narrow, color } = this.props;
    const { name, icon } = specials[narrow[0].operand];

    return (
      <View style={styles.navWrapper}>
        <Icon name={icon} size={20} color={color} style={styles.halfPaddingRight} />
        <Label style={[styles.navTitle, { color }]} text={name} />
      </View>
    );
  }
}
