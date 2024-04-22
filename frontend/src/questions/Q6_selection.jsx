import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const q6Selection = ({ onSave }) => {
  const handleChange = (event, newValue) => {
    onSave(newValue); // 親コンポーネントに選択された値を渡す
  };

  return (
    // 外側のBox: 子要素を中央に配置
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
      {/* 説明テキストのBox：Sliderと同じ幅にする */}
      <Box sx={{ width: '100%', maxWidth: 700, display: 'flex', justifyContent: 'space-between', mb: 2}}>
        <Typography variant="caption" sx={{ fontSize: '0.875rem' }}>0%</Typography>
        <Typography variant="caption" sx={{ fontSize: '0.875rem' }}>100%</Typography>
      </Box>
      {/* SliderのBox */}
      <Box sx={{ width: '100%', maxWidth: 700}}>
        <Slider
          defaultValue={50}
          aria-labelledby="q6-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={false}
          min={0}
          max={100}
          onChangeCommitted={handleChange}
          sx={{
            '& .MuiSlider-thumb': {
              color: 'lightgray',
            },
            '& .MuiSlider-track': {
              height: 8,
            },
            '& .MuiSlider-rail': {
              height: 8,
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default q6Selection;
