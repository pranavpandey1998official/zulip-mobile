/* @flow */
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import type { Context } from '../types';
import Label from './Label';
import Touchable from './Touchable';
import { IconRight } from './Icons';

type Props = {|
  Icon?: Object,
  label: string,
  onPress: () => void,
|};

export default class OptionButton extends PureComponent<Props> {
  context: Context;

  static contextTypes = {
    styles: () => null,
  };

  render() {
    const { label, onPress, Icon } = this.props;
    const { styles } = this.context;

    return (
      <Touchable onPress={onPress}>
        <View style={styles.listItem}>
          {Icon && <Icon size={18} style={[styles.icon, styles.settingsIcon]} />}
          <Label text={label} />
          <View style={styles.rightItem}>
            <IconRight size={18} style={[styles.icon, styles.settingsIcon]} />
          </View>
        </View>
      </Touchable>
    );
  }
}
