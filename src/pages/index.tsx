import React, { useState } from 'react';
import EditorPrv from '@/components/EditorPrv';
import { Card } from 'antd';

import './index.less';

export default () => {
  const [editUsr, setEditUsr] = useState('');

  const cardProps = {
    bordered: true,
    hoverable: true,
    title: setHeader(),
  };

  function setHeader() {
    return (
      <div id="header">
        <div className="date">Today: {getCurDate()}</div>
        <h1 className="title">日报填写</h1>
        <div className="cur-usr">当前编辑: {editUsr}</div>
      </div>
    );
  }

  // 获取当前日期
  function getCurDate(): string {
    let curDate = new Date();
    // year
    let year = curDate.getFullYear();
    // month  0-11  0: 1月
    let month = curDate.getMonth() + 1;
    // day
    let day = curDate.getDate();

    return `${year}/${month}/${day}`;
  }

  // 获取当前用户名

  return (
    <div style={{ padding: '1rem' }}>
      <Card {...cardProps} headStyle={{ textAlign: 'center' }}>
        {/* <Editor /> */}
        <EditorPrv fetchEditUsr={(u: string) => setEditUsr(u)} />
      </Card>
    </div>
  );
};
