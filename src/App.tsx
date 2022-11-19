import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import {Stack, Button, Typography} from '@mui/material'
import './App.css';
import { Box } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#666'
    }
  }
});

function App() {
  const [cookies, setCookie] = useCookies();
  const [all, setAll] = useState<number[]>([0, 0]);
  const [thisSplit, setThisSplit] = useState<number[]>([0, 0]);



  const handleWon = () => {
    setCookie("count", cookies.count + "w");
    console.log(cookies.count.split("s")[0]);
  }
  const handleLost = () => {
    setCookie("count", cookies.count + "l");
  }
  const handleSplit = () => {
    setCookie("count", cookies.count + "s");
  }
  const handleUndo = () => {
    setCookie("count", cookies.count.slice(0, -1));
  }
  return (
    <>
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center", 
        height: "50vh",
        textAlign: "center",
      }}>
        <Stack spacing={2} direction="column">
          <Typography>
            すべてのゲーム数： {cookies.count.match(/w|l/g)?.length || 0}
          </Typography>
        <Typography>
          {cookies.count.match(/w/g)?.length || 0}W-{cookies.count.match(/l/g)?.length || 0}L
        </Typography>
        <Typography>
          勝率： {Math.round((cookies.count.match(/w/g)?.length || 0) / (cookies.count.match(/w|l/g)?.length || 1) * 1000) / 10}%
        </Typography>
          <Typography>
            今スプリットのゲーム数： {cookies.count.split("s").reverse()[0].match(/w|l/g)?.length || 0}
          </Typography>
        <Typography>
          {cookies.count.split("s").reverse()[0].match(/w/g)?.length || 0}W-{cookies.count.split("s").reverse()[0].match(/l/g)?.length || 0}L
        </Typography>
        <Typography>
          勝率： {Math.round((cookies.count.match(/w/g)?.length || 0) / (cookies.count.match(/w|l/g)?.length || 1) * 1000) / 10}%
        </Typography>
          <Stack spacing={10} direction="row">
            <Button variant="contained" color="success" onClick={handleWon}>
              Won
            </Button>
            <Button variant="contained" color="secondary" onClick={handleLost}>
              Lost
            </Button>
          </Stack>
          <Button variant='outlined' color="primary" onClick={handleSplit}>
            Split
          </Button>
          <Button variant='outlined' color="error" onClick={handleUndo}>
            Undo
          </Button>
        </Stack>
      </Box>
      <Box sx={{ height:"2em"}}/>
      <Box sx={{
        display: "flex",
        justifyContent: "center", 
      }}>
      <Stack
        direction="column"
        spacing={0.5}
      >
      {cookies.count.split("").reverse().map((c:string, i:number) => (
        <>
        { c !== "s" ?(
          <Box
            sx={{
              backgroundColor: c==="w" ? "success.main" : "secondary.main",
              width: "20em",
              height: "1.5em",
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: "1px",
            }}
          >
          </Box>
        ) : (
          <Box
            sx={{
              width: "20em",
              height: "1.5em",
            }}
          >
          <hr>
          </hr>
          </Box>
        )}
        </>
      ))}
      </Stack>
      </Box>
    </ThemeProvider>
    </>
  );
}

export default App;
