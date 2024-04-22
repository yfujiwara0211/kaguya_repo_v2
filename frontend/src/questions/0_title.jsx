import React from 'react';

const Title = () => {
  return (
    <div className="mx-60 my-2 flex items-center justify-between">
      {/* 左のアイコンの部分にフォントスタイルを適用 */}
      <div
      style={{
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fontSize: '22px',
        marginTop: '20px',
        marginBottom: '10px',
        }}>
        KAGUYA OFFICE VISION CHECKER
      </div>
    </div>
  );
};

export default Title;