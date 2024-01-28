import Logo from '@/components/Logo';
import Nav from '@/components/Nav';
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