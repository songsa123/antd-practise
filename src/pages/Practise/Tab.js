import React, { Component } from 'react';
import { Carousel } from 'antd';
import styles from './tab.less';
import Tab1 from './components/tab1';
import Tab2 from './components/tab2';
import Tab3 from './components/tab3';

class Tab extends Component {
    render() {
        return (
            <div className={styles.box}>
                <Carousel effect="fade">
                    <Tab1></Tab1>
                    <Tab2></Tab2>
                    <Tab3></Tab3>
                </Carousel>
            </div>
        );
    }
}

export default Tab;