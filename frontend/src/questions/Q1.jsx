import React from 'react';

const Q1 = () => {
  return (
    <div className="mx-60 my-5 flex items-center justify-between">
      {/* 左のアイコンの部分にフォントスタイルを適用 */}
      <div className="my-0 flex items-start" style={{ fontFamily: 'Arial, sans-serif',marginTop: '10px', marginBottom: '10px' }}>
        1. あなたの会社の5年後の目標に近いキーワードを選んでください（複数回答）。
      </div>
    </div>
  );
};

export default Q1;