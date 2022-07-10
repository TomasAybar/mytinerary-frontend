import Footer from './components/Footer';
import NavBar from './components/NavBar';
import ScrollTop from './components/ScrollTop';
import Home from './pages/Home';
import Cities from './pages/Cities';
import NotFound from './pages/NotFound';
import Detail from './pages/Detail';

import { Toaster } from 'react-hot-toast'; // TOSTADA

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import ScrollToTop from "react-scroll-to-top";

import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';

import './style/style.css';
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';

// const notify = () => toast('Here is your toast.');

function App(props) {

  useEffect(() => { // se ejecuta en todas las paginas la verificacion de si hay token o no

    if (localStorage.getItem('token') !== null) {

      const token = localStorage.getItem('token')

      props.verifyToken(token) // llamo a mi action verify token
    }

    // eslint-disable-next-line

  },[])

  // console.log(props.user)
  return (
    <>
      <Toaster />
      <NavBar />
      <ScrollTop /> {/* hace que mi pagina siempre comience desde el top */}
      <Routes>

        <Route path='*' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/cities' element={<Cities />} />
        <Route path='/cities/city/:id' element={<Detail />} />
        {/* <Route path='/signin' element={<SignIn />} /> */}
        {/* <Route path='/signup' element={<SignUp />} /> */}
        {!props.user && <Route path='/signin' element={<SignIn />} />}
        {!props.user && <Route path='/signup' element={<SignUp />} />}
        <Route path='/*' element={<NotFound />} />


      </Routes>

      <ScrollToTop
        smooth
        style={{
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          backgroundColor: '#FFA500',
        }}
        component={
          <p style={{
            fontSize: '1.5rem',
            color: '#ffffff',
            fontWeight: '600'
          }}>⬆</p>}
      />
      <Footer />
    </>
  );
}

const mapDispatchToProps = {
  verifyToken: userActions.verifyToken,
}

const mapStateToProps = (state) => {
  return {
    user: state.usersReducer.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App;
