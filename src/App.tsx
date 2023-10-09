/* eslint-disable array-callback-return */
import { Box, Grid, ListItem, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Prefecture {
  isChecked: boolean | undefined;
  prefCode: number;
  prefName: string;
}

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-API-KEY': '6ih9bXRlXUGWPhPH0TWFTxgg95pqklyzFUnWtock',
  };

  useEffect(() => {
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: headers,
      })
      .then(response => {
        const formattedData = response.data.result.map((item: Prefecture) => ({
          ...item,
          isChecked: false,
        }));
        setPrefectures(formattedData);
      });
  }, []);

  const handleToggleCheckbox = (prefCode: number) => {
    setPrefectures(prevPrefectures =>
      prevPrefectures.map(prefecture =>
        prefecture.prefCode === prefCode ? { ...prefecture, isChecked: !prefecture.isChecked } : prefecture
      )
    );
  };

  console.log(prefectures)

  return (
    <>
    <div>
      <Typography variant="h2">都道府県</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {prefectures.map((prefecture: Prefecture) => (
          <span key={prefecture.prefCode} style={{ minWidth: '120px' }}>
            <input type='checkbox' checked={prefecture.isChecked}  onChange={() => handleToggleCheckbox(prefecture.prefCode)} />{prefecture.prefName}
          </span>
        ))}
      </Box>
    </div>
    </>
  );
}

export default App;
