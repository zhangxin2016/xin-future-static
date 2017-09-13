//Component1.jsx
import React from 'react';
import styles from '../css/style.css'; //模块应用css

class Component extends React.Component {
    render() {
        return (
            <div id={styles.content}>Hello World zhang!</div>
        )
    }
}

//导出组件
export default Component;
