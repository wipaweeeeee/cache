import Logo from '../Logo/';
import Nav from '../Nav';
import { Outlet } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <Logo />
            <Nav />
            <Outlet/>
        </>
    )
}

export default Header;