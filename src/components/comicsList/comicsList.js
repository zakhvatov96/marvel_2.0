import uw from '../../resources/img/UW.png';
import xmen from '../../resources/img/x-men.png';

import './comicsList.scss';

const ComicsList = () => {
	return (
		<div className="comics__list">
			<ul className="comics__grid">
				<li className="comics__grid-item">
					<img src={uw} alt="uw" className="comics__grid-item-img" />
					<div className="comics__grid-item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
					<div className="comics__grid-item-price">9.99$</div>
				</li>
				<li className="comics__grid-item">
					<img src={xmen} alt="xmen" className="comics__grid-item-img" />
					<div className="comics__grid-item-name">X-Men: Days of Future Past</div>
					<div className="comics__grid-item-price">NOT AVAILABLE</div>
				</li>
				<li className="comics__grid-item">
					<img src={uw} alt="uw" className="comics__grid-item-img" />
					<div className="comics__grid-item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
					<div className="comics__grid-item-price">9.99$</div>
				</li>
				<li className="comics__grid-item">
					<img src={xmen} alt="xmen" className="comics__grid-item-img" />
					<div className="comics__grid-item-name">X-Men: Days of Future Past</div>
					<div className="comics__grid-item-price">9.99$</div>
				</li>
				<li className="comics__grid-item">
					<img src={uw} alt="uw" className="comics__grid-item-img" />
					<div className="comics__grid-item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
					<div className="comics__grid-item-price">9.99$</div>
				</li>
				<li className="comics__grid-item">
					<img src={xmen} alt="xmen" className="comics__grid-item-img" />
					<div className="comics__grid-item-name">X-Men: Days of Future Past</div>
					<div className="comics__grid-item-price">NOT AVAILABLE</div>
				</li>
				<li className="comics__grid-item">
					<img src={uw} alt="uw" className="comics__grid-item-img" />
					<div className="comics__grid-item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
					<div className="comics__grid-item-price">9.99$</div>
				</li>
				<li className="comics__grid-item">
					<img src={xmen} alt="xmen" className="comics__grid-item-img" />
					<div className="comics__grid-item-name">X-Men: Days of Future Past</div>
					<div className="comics__grid-item-price">9.99$</div>
				</li>
			</ul>
			<button className="button button__long button__main">
				<div className="inner">LOAD MORE</div>
			</button>
		</div>
	);
}

export default ComicsList;