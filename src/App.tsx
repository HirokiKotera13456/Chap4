/* eslint-disable array-callback-return */
import { Box, Grid, ListItem, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Prefecture {
  prefCode: number;
  prefName: string;
}

function App() {
  const [prefec, setPrefec] = useState([]);

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
        setPrefec(response.data.result);
      });
  }, []);

  return (
    <>
    <div>
      <Typography variant="h2">都道府県</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {prefec.map((data: Prefecture) => (
          <span key={data.prefCode} style={{ minWidth: '120px' }}>
            <input type='checkbox'/>{data.prefName}
          </span>
        ))}
      </Box>
    </div>
    </>
  );
}

export default App;
