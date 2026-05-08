import { Link } from 'react-router-dom';

const Nav = ({ navtext, iconImg, path, s }) => {
    return (

        <Link to={path} className={s}>
            <img src={iconImg} alt={navtext} />
            <span>{navtext}</span>
        </Link>
    );
}
export default Nav;