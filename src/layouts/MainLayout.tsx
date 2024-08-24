import Header from '../components/Header.tsx'
import Nav from '../components/Nav.tsx'
import Footer from '../components/Footer.tsx'
import CajaMain from '../components/CajaMain.tsx'
import LibrosHome from '../components/LibrosHome.tsx'

export default function MainLayout() {
    return (
      <>
        <Header/>
        <Nav/>
        <CajaMain/>
        <LibrosHome/>
        <Footer/>
      </>
    )
}
  