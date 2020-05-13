import React from 'react';
import Tablemail from './TableMail/tablemail';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
      <Tablemail/>
      </Container>
    </React.Fragment>    
  );
}

export default App;
