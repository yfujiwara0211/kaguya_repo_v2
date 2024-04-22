import React, { useState } from 'react';
import './selection.css'; // CSSファイルをインポートする

// データベース保存形式と表示形式のマッピング
const optionsMapping = {
  '複数の事業を運営する事業別チーム': '1_複数の事業を運営する事業別チーム',
  '各分野の専門人材による機能別チーム': '2_各分野の専門人材による機能別チーム',
  'フレキシブルなプロジェクトチーム': '3_フレキシブルなプロジェクトチーム',
  '小規模な一体型チーム': '4_小規模な一体型チーム',
};

const Q2selection = ({ onSave }) => {
  // useStateの初期値をnullに設定して、単一の選択肢を管理します
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
            // selectedKeyword === keyword を使用して、選択された選択肢をハイライト
            className={`chip chip-q2 ${selectedKeyword === keyword ? 'selected' : ''}`}
            onClick={() => handleKeywordSelect(keyword)}
          >
            {keyword}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Q2selection;
