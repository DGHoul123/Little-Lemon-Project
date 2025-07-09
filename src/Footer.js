import logo from './Logo.svg';

function Footer(){
    return(
        <footer className='footer-container'>
            <img src={logo} alt="Little Lemon Logo"/>
            <div>
                <h3>Doormat Navigation</h3>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/menu">Menu</a></li>
                    <li><a href="/reservations">Reservations</a></li>
                    <li><a href="/order-online">Order Online</a></li>
                </ul>
            </div>
            <div className='footer-contact'>
                <h3>Contact</h3>
                <ul>
                    <li><a>Address</a></li>
                    <li><a>Phone</a></li>
                    <li><a>Email</a></li>
                </ul>
            </div>
            <div>
                <h3>Social Media Links</h3>
                <ul>
                    <li><a>Address</a></li>
                    <li><a>Phone</a></li>
                    <li><a>Email</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;