/* @flow strict-local */
import { connect } from 'react-redux';

import React, { PureComponent } from 'react';

import type { Dispatch, GlobalState } from '../types';
import { Screen } from '../common';
import LanguagePicker from './LanguagePicker';
import { getSettings } from '../selectors';
import { settingsChange } from '../actions';

type Props = {
  dispatch: Dispatch,
  locale: string,
};

class LanguageScreen extends PureComponent<Props> {
  props: Props;

  handleLocaleChange = (value: string) => {
    const { dispatch } = this.props;
    dispatch(settingsChange({ locale: value }));
  };

  render() {
    const { locale } = this.props;

    return (
      <Screen title="Language" scrollEnabled={false}>
        <LanguagePicker value={locale} onValueChange={this.handleLocaleChange} />
      </Screen>
    );
  }
}

export default connect((state: GlobalState) => ({
  locale: getSettings(state).locale,
}))(LanguageScreen);
