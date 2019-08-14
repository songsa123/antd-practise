import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Pro ',
          title: 'Pro ',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'haha',
          title: 'haha',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          <Icon type="copyright" /> 2019 哈哈出品
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
