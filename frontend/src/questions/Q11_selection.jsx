import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const q11Selection = ({ onSave }) => {
  const [number, setNumber] = useState('');

  const handleChange = (event) => {
    setNumber(event.target.value);
    onSave(event.target.value); // 親コンポーネントに入力値を渡す
  };

  return (
    <Box sx={{ display: 'block', maxWidth: 200, marginLeft: 5 }}> {/* marginLeftを調整 */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          label=""
          type="number"
          variant="outlined"
          value={number}
          onChange={handleChange}
          InputProps={{
            inputProps: { 
              min: 1 // ここで最小値を設定
            }
          }}
          sx={{ marginRight: 1, flexGrow: 1 }}
        />
        <Typography>㎡</Typography>
      </Box>
    </Box>
  );
}

export default q11Selection;
