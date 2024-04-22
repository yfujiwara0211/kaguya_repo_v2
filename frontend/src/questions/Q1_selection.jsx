import React, { useState } from 'react';
import './selection.css'; // CSSファイルをインポートする

// データベース保存形式と表示形式のマッピング
const optionsMapping = {
  '成長': '1_成長',
  'イノベーション': '2_イノベーション',
  'グローバル': '3_グローバル',
  'リーダーシップ': '4_リーダーシップ',
  '持続可能性': '5_持続可能性',
  '地域社会貢献': '6_地域社会貢献',
  '多様性': '7_多様性',
  '安心安全': '8_安心安全',
};

const Q1selection = ({ onSave }) => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleKeywordSelect = (keyword) => {
    let updatedKeywords;
    if (selectedKeywords.includes(keyword)) {
      // キーワードが既に選択されていれば、それを選択解除
      updatedKeywords = selectedKeywords.filter((k) => k !== keyword);
    } else {
      // そうでなければ、キーワードを選択
      updatedKeywords = [...selectedKeywords, keyword];
    }
    setSelectedKeywords(updatedKeywords);

    // マッピングを使用してデータベース保存形式に変換
    const dbValues = updatedKeywords.map(k => optionsMapping[k]);
    onSave(dbValues); // 更新されたキーワードリストをonSaveに渡す
  };

  return (
    <div className="mx-60 my-5 ">
      <div className="chips-container">
        {Object.keys(optionsMapping).map((keyword) => (
          <div
            key={keyword}
            className={`chip chip-q1 ${selectedKeywords.includes(keyword) ? 'selected' : ''}`}
            onClick={() => handleKeywordSelect(keyword)}
          >
            {keyword}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Q1selection;
