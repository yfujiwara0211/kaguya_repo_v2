'use client';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Title from '../../../questions/0_title';
import Q1 from '../../../questions/Q1';
import Q1selection from '../../../questions/Q1_selection';
import Q2 from '../../../questions//Q2';
import Q2selection from '../../../questions/Q2_selection';
import Q3 from '../../../questions//Q3';
import Q3selection from '../../../questions/Q3_selection';
import Q4 from '../../../questions//Q4';
import Q4selection from '../../../questions/Q4_selection';
import Q5 from '../../../questions//Q5';
import Q5selection from '../../../questions/Q5_selection';
import Q6 from '../../../questions//Q6';
import Q6selection from '../../../questions/Q6_selection';
import Q7 from '../../../questions/Q7';
import Q7selection from '../../../questions/Q7_selection';
import Q8 from '../../../questions/Q8';
import Q8selection from '../../../questions/Q8_selection';
import Q9 from '../../../questions/Q9';
import Q9selection from '../../../questions/Q9_selection';
import Q10 from '../../../questions/Q10';
import Q10selection from '../../../questions/Q10_selection';
import Q11 from '../../../questions/Q11';
import Q11selection from '../../../questions/Q11_selection';
import { Box, Button } from "@mui/material";
import { LoginUserContext } from "../../../components/LoginUserProvider";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme/theme'

const Submit = ({ onSubmit }) => {
  return (
    <div className="flex justify-center mt-4">
      <Button fullWidth variant="contained" color="primary" onClick={onSubmit}>
        回答を送信する
      </Button>
    </div>
  );
};

export default function Home() {
  // 設問の回答を管理する状態
  const [responses, setResponses] = useState({
    q1Selection: [],
    q2Selection: "",
    q3Selection: 50, //Q3のデフォルト値を50に設定
    q4Selection: 50, //Q4のデフォルト値を50に設定
    q5Selection: 50, //Q5のデフォルト値を50に設定
    q6Selection: 50, //Q6のデフォルト値を50に設定
    q7Selection: [],
    q8Selection: "",
    q9Selection: [],
    q10Selection: "",
    q11Selection: "",
  });

  const { isLogined } = useContext(LoginUserContext);
  const [styleCheckerError, setStyleCheckerError] = useState("");

  // 認証トークンを取得する関数
  const getAuthInfo = () => {
    const token = localStorage.getItem("token");
    return { token };
  };

  // Q1selectionからの回答を収集する関数
  const handleSaveQ1Selection = (selection) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      q1Selection: selection,
    }));
  };

  // Q2selectionからの回答を収集する新しい関数
  const handleSaveQ2Selection = (selection) => {
    setResponses({ ...responses, q2Selection: selection });
  };

  // Q3selectionからの回答を収集する新しい関数
  const handleSaveQ3Selection = (selection) => {
    setResponses({ ...responses, q3Selection: selection });
  };

  // Q4selectionからの回答を収集する新しい関数
  const handleSaveQ4Selection = (selection) => {
    setResponses({ ...responses, q4Selection: selection });
  };

  // Q5selectionからの回答を収集する新しい関数
  const handleSaveQ5Selection = (selection) => {
    setResponses({ ...responses, q5Selection: selection });
  };

  // Q6selectionからの回答を収集する新しい関数
  const handleSaveQ6Selection = (selection) => {
    setResponses({ ...responses, q6Selection: selection });
  };

  // Q7selectionからの回答を収集する関数
  const handleSaveQ7Selection = (selection) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      q7Selection: selection,
    }));
  };

  // Q8selectionからの回答を収集する新しい関数
  const handleSaveQ8Selection = (selection) => {
    setResponses({ ...responses, q8Selection: selection });
  };

  // Q9selectionからの回答を収集する関数
  const handleSaveQ9Selection = (selection) => {
    setResponses((currentResponses) => ({
      ...currentResponses,
      q9Selection: selection,
    }));
  };

  // Q10selectionからの回答を収集する関数
  const handleSaveQ10Selection = (selection) => {
    setResponses({ ...responses, q10Selection: selection });
  };

  // Q11selectionからの回答を収集する関数
  const handleSaveQ11Selection = (selection) => {
    setResponses({ ...responses, q11Selection: selection });
  };

  const router = useRouter();

  // 送信ボタンの処理
  const handleSubmit = async () => {
    // 未選択の設問名を格納する配列
    const unselectedQuestions = [];
    // 無効な入力をした設問名を格納する配列（0以下の数値が入力された場合）
    const invalidInputQuestions = [];

    // 各設問の選択状態を確認
    if (responses.q1Selection.length === 0) unselectedQuestions.push("Q1");
    if (responses.q2Selection === "") unselectedQuestions.push("Q2");
    if (responses.q7Selection.length === 0) unselectedQuestions.push("Q7");
    if (responses.q8Selection === "") unselectedQuestions.push("Q8");
    if (responses.q9Selection.length === 0) unselectedQuestions.push("Q9");
    // Q10とQ11について、1以上の数値が入力されているかチェック
    if (!responses.q10Selection || responses.q10Selection <= 0) invalidInputQuestions.push("Q10");
    if (!responses.q11Selection || responses.q11Selection <= 0) invalidInputQuestions.push("Q11");

    let alertMessage = "";
    // 未選択の設問があれば警告メッセージを準備
    if (unselectedQuestions.length > 0) {
      alertMessage += `${unselectedQuestions.join("、")}の設問が未選択です。`;
    }
    // 無効な入力があれば警告メッセージを追加
    if (invalidInputQuestions.length > 0) {
      if (alertMessage.length > 0) alertMessage += "\n"; // 既に他のメッセージがある場合は改行を挿入
      alertMessage += `${invalidInputQuestions.join("、")}には1以上の数値を入力してください。`;
    }

    // いずれかの警告があれば警告を表示して送信処理を中断
    if (alertMessage.length > 0) {
      alert(alertMessage);
      return;
    }

    // Q3～Q6の値を0～1の範囲に変換
    const q3Converted = responses.q3Selection === 100 ? 1 : responses.q3Selection === 0 ? 0 : responses.q3Selection / 100;
    const q4Converted = responses.q4Selection === 100 ? 1 : responses.q4Selection === 0 ? 0 : responses.q4Selection / 100;
    const q5Converted = responses.q5Selection === 100 ? 1 : responses.q5Selection === 0 ? 0 : responses.q5Selection / 100;
    const q6Converted = responses.q6Selection === 100 ? 1 : responses.q6Selection === 0 ? 0 : responses.q6Selection / 100;

    // 認証されていない場合は処理を中断
    if (!isLogined) {
      alert("ログインが必要です");
      return;
    }

    // 認証トークンを取得
    const { token } = getAuthInfo();

    // 送信処理を続行
    try {
      const response = await fetch('http://127.0.0.1:8000/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 認証トークンをヘッダーに含める
        },
        body: JSON.stringify({
          q1_answer: responses.q1Selection, 
          q2_answer: responses.q2Selection,
          q3_answer: q3Converted, 
          q4_answer: q4Converted, 
          q5_answer: q5Converted,
          q6_answer: q6Converted,
          q7_answer: responses.q7Selection,
          q8_answer: responses.q8Selection,
          q9_answer: responses.q9Selection,
          q10_answer: responses.q10Selection,
          q11_answer: responses.q11Selection,
        }),
      });
  
      if (!response.ok) {
        throw new Error('サーバーへの送信に失敗しました');
      }
  
      const result = await response.json();
      console.log("回答を送信しました");
      // alert('回答を送信しました');
      router.push('/login/home/recommend'); // 遷移先のパスを指定　リダイレクト先は仮でログイン画面に
    } catch (error) {
      console.error('エラー:', error);
      alert('エラーが発生しました: ' + error.message);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
       {/* 共通のスタイリングを適用する親コンテナ */}
       <Box sx={{ maxWidth: '900px', margin: 'auto' }}>
          <Title />
          <Q1 />
           {/* Q1selectionにonSaveプロパティとしてhandleSaveQ1Selectionを渡す */}
            <Q1selection onSave={handleSaveQ1Selection} />
          <Q2 />
           {/* Q2selection に onSave プロパティとして handleSaveQ2Selection を渡す */}
            <Q2selection onSave={handleSaveQ2Selection} />
          <Q3 />
           {/* Q3selection に onSave プロパティとして handleSaveQ3Selection を渡す */}
            <Q3selection onSave={handleSaveQ3Selection} />
          <Q4 />
            {/* Q4selection に onSave プロパティとして handleSaveQ4Selection を渡す */}
            <Q4selection onSave={handleSaveQ4Selection} />
          <Q5 />
           {/* Q5selection に onSave プロパティとして handleSaveQ5Selection を渡す */}
           <Q5selection onSave={handleSaveQ5Selection} />
          <Q6 />
            {/* Q6selection に onSave プロパティとして handleSaveQ6Selection を渡す */}
            <Q6selection onSave={handleSaveQ6Selection} />
          <Q7 />
            {/* Q7selectionにonSaveプロパティとしてhandleSaveQ7Selectionを渡す */}
            <Q7selection onSave={handleSaveQ7Selection} />
          <Q8 />
            {/* Q8selection に onSave プロパティとして handleSaveQ8Selection を渡す */}
            <Q8selection onSave={handleSaveQ8Selection} />
          <Q9 />
            {/* Q9selectionにonSaveプロパティとしてhandleSaveQ9Selectionを渡す */}
            <Q9selection onSave={handleSaveQ9Selection} />
          <Q10 />
          {/* Q10 コンポーネントに onSave プロパティを渡す */}
            <Q10selection onSave={handleSaveQ10Selection} />
          <Q11 />
          {/* Q10 コンポーネントに onSave プロパティを渡す */}
            <Q11selection onSave={handleSaveQ11Selection} />

          {styleCheckerError && <Typography color="error">{styleCheckerError}</Typography>}
          {/* 送信ボタンにhandleSubmitを渡す */}
          <Submit onSubmit={handleSubmit} />
        </Box>
      </ThemeProvider>
    </>
  );
}

