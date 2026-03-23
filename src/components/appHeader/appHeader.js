import { Link, NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
	return (
		<header className="header">
			<h1 className="header__title">
				<Link to="/">
					<span>Marvel</span> information portal
				</Link>
			</h1>
			<nav className="header__nav">
				<ul>
					<li><NavLink end 
								 className='header__nav-item'
								 style={({isActive})=>({color: isActive ? '#9F0013' : 'inherit'})}
								 to="/">Characters</NavLink></li>
					/
					<li><NavLink end className='header__nav-item'
					style={({isActive})=>({color: isActive ? '#9F0013' : 'inherit'})}
					to="/comics">Comics</NavLink></li>
				</ul>
			</nav>
		</header>
	);
}

export default AppHeader;