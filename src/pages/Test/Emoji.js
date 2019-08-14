import React, { Component, PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card } from 'antd';
import style from './emoji.css';
import '../../../node_modules/emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
class Emoji extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper>
        <Card>
          <Picker set="emojione" />
          <Picker onSelect={this.addEmoji} />
          <Picker title="Pick your emoji…" emoji="point_up" />
          <Picker style={{ position: 'absolute', bottom: '20px', right: '20px' }} />
          <Picker
            i18n={{
              search: 'Recherche',
              categories: { search: 'Résultats de recherche', recent: 'Récents' },
            }}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Emoji;
