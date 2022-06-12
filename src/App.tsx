import { Paper, Button } from '@mui/material';
import './index.scss';

export const App = () => {
  // const data = {
  //   prop: 'value',
  // };

  // const writeData = async (data: { prop: string }) => {
  //   await fetch('./data.json', {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //   });
  // };

  // const readData = async () => {
  //   const response = await fetch('./data.json');
  //   const data = await response.json();
  //   console.log(data);
  // };

  {
    /* <button onClick={() => readData()}>READ</button>
      <button onClick={() => writeData(data)}>WRITE</button> */
  }

  return (
    <div className="container">
      <Paper className="editor">
        <div className="editor_header">
          <h1 className="editor_title">Your notes</h1>
          <Button className="editor_create-btn" variant="outlined">
            Create a note
          </Button>
        </div>
      </Paper>
    </div>
  );
};
