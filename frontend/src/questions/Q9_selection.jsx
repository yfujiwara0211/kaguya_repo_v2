import React, { useState } from 'react';
import './selection.css'; // CSSファイルをインポートする

// データベース保存形式と表示形式のマッピング
const optionsMapping = {
  '腰痛肩こり対策': '1_腰痛肩こり対策',
  '観葉植物': '2_観葉植物',
  'カフェ': '3_カフェ',
  '仮眠・瞑想': '4_仮眠・瞑想',
  'アート': '5_アート',
  'ゲーム': '6_ゲーム',
  'ライブラリー': '7_ライブラリー',
  'フレックス': '8_フレックス',
};

const Q9selection = ({ onSave }) => {
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

export default Q9selection;
