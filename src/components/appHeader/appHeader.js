import './appHeader.scss';

const AppHeader = () => {
	return (
		<header className="header">
			<h1 className="header__title"><span>Marvel</span> information portal</h1>
			<nav className="header__nav">
				<ul>
					<li><a className='header__nav-item' href="#">Characters</a></li>
					/
					<li><a className='header__nav-item header__nav-item-active' href="#">Comics</a></li>
				</ul>
			</nav>
		</header>
	);
}

export default AppHeader;