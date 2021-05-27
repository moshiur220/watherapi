
// import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './component/Header';
import Search from './component/Search';
import './index.css';

function App() {

  return (
<div>
    <Header/>
      <CssBaseline />
      <Container className="m-top" >
       <Search/>
      </Container>

    </div>
  );
}

export default App;
