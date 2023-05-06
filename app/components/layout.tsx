import { ReactNode } from 'react';
import Footer from './footer';
import Header from './header';

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;