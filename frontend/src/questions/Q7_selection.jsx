import React, { useState } from 'react';
import './selection.css'; // CSSファイルをインポートする

// データベース保存形式と表示形式のマッピング
const optionsMapping = {
  'クリエイティブ': '1_クリエイティブ',
  'スタンダード': '2_スタンダード',
  'フレンドリー': '3_フレンドリー',
  'フォーマル': '4_フォーマル',
  '自由': '5_自由',
  '規律': '6_規律',
  'オープン': '7_オープン',
  'クローズ': '8_クローズ',
};

const Q7selection = ({ onSave }) => {
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
    <div className="mx-60 my-5">
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

export default Q7selection;
