import React, { useState } from 'react';
import './selection.css'; // CSSファイルをインポートする

// データベース保存形式と表示形式のマッピング
const optionsMapping = {
  '赤': '1_レッド',
  'オレンジ': '2_オレンジ',
  '黄色': '3_イエロー',
  '緑': '4_グリーン',
  '青': '5_ブルー',
  '紫': '6_パープル',
  'ピンク': '7_ピンク',
  'グレー': '8_グレー',
  '白': '9_ホワイト',
  '黒': '10_ブラック',
};

const Q8selection = ({ onSave }) => {
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  const handleKeywordSelect = (keyword) => {
    setSelectedKeyword(keyword);
    // マッピングを使用してデータベース保存形式に変換
    const dbValue = optionsMapping[keyword];
    onSave(dbValue); // 選択されたキーワードのデータベース保存形式をonSaveに渡す
  };

  return (
    <div className="mx-60 my-5">
      <div className="chips-container">
        {Object.keys(optionsMapping).map((keyword) => (
          <div
            key={keyword}
            className={`chip chip-q8 ${selectedKeyword === keyword ? 'selected' : ''}`}
            style={{ backgroundColor: getColorCode(keyword), borderColor: selectedKeyword === keyword ? 'black' : (keyword === '白' ? '#ccc' : 'transparent') }}
            onClick={() => handleKeywordSelect(keyword)}
          >
            {/* 色名を非表示 */}
            
          </div>
        ))}
      </div>
    </div>
  );
};

// 選択されたキーワードに対応する色を返すヘルパー関数
const getColorCode = (keyword) => {
  // キーワードを日本語から英語に変換してから色コードを返す
  const colorNameInEnglish = optionsMapping[keyword].split('_')[1].toLowerCase();
  switch (colorNameInEnglish) {
    case 'レッド':
      return '#ff0000';
    case 'オレンジ':
      return '#ffa500';
    case 'イエロー':
      return '#ffff00';
    case 'グリーン':
      return '#008000';
    case 'ブルー':
      return '#0000ff';
    case 'パープル':
      return '#800080';
    case 'ピンク':
      return '#ff00ff';
    case 'グレー':
      return '#808080';
    case 'ホワイト':
      return '#ffffff';
    case 'ブラック':
      return '#000000';
    default:
      return '#f0ecec'; // デフォルトの色
  }
};

export default Q8selection;
