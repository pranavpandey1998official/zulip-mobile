/* @flow strict-local */
import React, { PureComponent } from 'react';

import type { Style } from '../types';
import styles, { BRAND_COLOR } from '../styles';
import ComponentWithOverlay from '../common/ComponentWithOverlay';
import UnreadCount from '../common/UnreadCount';
import Icon from '../common/Icons';

type Props = {|
  color: string,
  style?: Style,
  name?: string,
  unreadCount: number,
  onPress: () => void,
|};

export default class NavButton extends PureComponent<Props> {
  static defaultProps = {
    color: BRAND_COLOR,
    unreadCount: 0,
  };

  render() {
    const { name, style, color, unreadCount, onPress } = this.props;

    return (
      <ComponentWithOverlay
        style={styles.navButtonFrame}
        showOverlay={unreadCount > 0}
        overlaySize={20}
        overlay={<UnreadCount count={unreadCount} />}
        onPress={onPress}
      >
        <Icon style={[styles.navButtonIcon, style]} color={color} name={name} />
      </ComponentWithOverlay>
    );
  }
}
