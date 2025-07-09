import logo from './Logo.svg';
import Navigation from './navigation';

function Header(){
    return(
        <header className='header-container'>
            <div>
            <img src={logo} alt='Little Lemon Logo'/>
            </div>
            <div>
                <Navigation/>
            </div>
        </header>
    );
}

export default Header;