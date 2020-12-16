import React, { useState } from 'react';
import Editor from '@/components/Editor';
import EditorPrv from '@/components/EditorPrv';
import { Card } from 'antd';

export default () => {
  const [editUsr, setEditUsr] = useState('');

  const cardProps = {
    bordered: true,
    hoverable: true,
    title: setHeader(),
  };

  function setHeader() {
    return (
      <div
        className="header"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <div className="date">Date: {getCurDate()}</div>
        <div className="title">日报填写</div>
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
    <div style={{ padding: '1.5rem' }}>
      <Card {...cardProps} headStyle={{ textAlign: 'center' }}>
        {/* <Editor /> */}
        <EditorPrv fetchEditUsr={(u: string) => setEditUsr(u)} />
      </Card>
    </div>
  );
};
