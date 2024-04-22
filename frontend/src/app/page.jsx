'use client'

import React, { useState } from "react";
import axios from "axios";
import { Container, Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import Link from 'next/link'
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme'

const Register = () => {
    const [user, setUser] = useState({
        company: '',
        username: '',
        address: '',
        phonenumber: '',
        email:'',
        password:'',
        industry:'',
        employees:'',
    });

    const [registrationError, setRegistrationError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const register = async (userInfo) => {
        console.log("登録処理開始");
        console.log("送信するデータ:", userInfo);

        try {
            const endpoint = "http://127.0.0.1:8000/users/";
            const response = await axios.post(endpoint, userInfo, {
                headers: { 'Content-Type': 'application/json' }
            });

            // ステータスコードが200の場合はログイン成功とみなす
            if (response.status === 200) {
              console.log("登録成功");
              // 登録成功の場合はログインページにリダイレクト
              window.location.href = "/login";
            } else {
                // ここに到達することは少ないが、念のための処理
                throw new Error('登録に失敗しました。');
            }
        } catch (error) {
            if (error.response) {
                // 401エラーを含む、すべてのHTTPエラーレスポンスをハンドリング
                console.error('登録エラー:', error.response.status, error.response.data);
                setRegistrationError(`登録エラー: ${error.response.data.message || '登録に失敗しました。'}`);
            } else if (error.request) {
                // リクエストは送られたが、レスポンスが受け取れなかったケース
                console.error('レスポンスが受け取れませんでした。', error.request);
                setRegistrationError('サーバーからの応答がありません。ネットワーク接続を確認してください。');
            } else {
                // リクエスト送信前に何かしらのエラーが発生したケース
                console.error('リクエストエラー', error.message);
                setRegistrationError('リクエストの送信中にエラーが発生しました。');
            }
          }
    };

    const onClickLogin = () => {
        register(user);
    };

    const IndustrySelectBox = [
        { label: "製造業", value: "manufacturing" },
        { label: "金融", value: "finance" },
        { label: "不動産", value: "realestate" },
        { label: "教育", value: "education" },
        { label: "医療", value: "medicalcare" },
        { label: "飲食業", value: "restaurant" },
        { label: "IT", value: "it" },
        { label: "エネルギー", value: "energy" },
        { label: "マーケティング", value: "marketing" },
        { label: "コンサルティング", value: "consulting" },
        { label: "その他", value: "other" }
      ];
    
    const NumberOfEmployees = [
        { label: "20人以下", value: "scale1" },
        { label: "21~50人", value: "scale2" },
        { label: "51~100人", value: "scale3" },
        { label: "101~300人", value: "scale4" },
        { label: "301~1000人", value: "scale5" },
        { label: "1001~5000人", value: "scale6" },
        { label: "5000人以上", value: "scale7" }
      ];

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h5">
                            KAGUYA会員登録フォーム
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="company"
                            label="会社名"
                            id="company"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="username"
                            label="担当者氏名"
                            id="username"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="address"
                            label="会社住所"
                            type="address"
                            id="address"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phonenumber"
                            label="電話番号"
                            id="phoneunber"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="メールアドレス"
                            id="mailaddress"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="パスワード"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            // required
                            select
                            fullWidth
                            value={user.industry}
                            label="業種"
                            id="industry"
                            name="industry"
                            onChange={handleChange}
                        >
                            {IndustrySelectBox.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                            {item.label}
                            </MenuItem>))}
                        </TextField>
                        <TextField
                            margin="normal"
                            // required
                            select
                            fullWidth
                            value={user.employees}
                            label="従業員数"
                            id="employees"
                            name="employees"
                            onChange={handleChange}
                        >
                            {NumberOfEmployees.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                            {item.label}
                            </MenuItem>))}
                        </TextField>
                        {registrationError && <Typography color="error">{registrationError}</Typography>}
                        <Button
                            fullWidth
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={onClickLogin}
                        >
                            登録
                        </Button>
                        <Link href="/login">ログインフォームはこちら</Link>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default Register;


