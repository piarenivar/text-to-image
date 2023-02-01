import './Nav.css';

export default function Nav() {
    return (
        <nav>
            <a href="https://pabloarenivar.io/" target="blank">Pablo Arenivar <i className="fa-solid fa-link fa-xs"></i></a>
            <div className="socials">
                <a href="https://github.com/piarenivar" target="blank"><i className="fa-brands fa-github fa-xl"></i></a>
                <a href="https://www.linkedin.com/in/pabloarenivar/" target="blank"><i className="fa-brands fa-linkedin fa-xl"></i></a>
            </div>
        </nav>
    )
}