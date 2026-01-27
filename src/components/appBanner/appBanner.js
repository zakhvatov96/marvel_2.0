import heroes from '../../resources/img/Avengers.png';
import avengers from '../../resources/img/Avengers_logo.png';

import './appBanner.scss';

const AppBanner = () => {
	return (
		<div className="banner">
			<img src={heroes} alt="heroes" className="banner__img-heroes" />
			<div className="banner__text">New comics every week!
				Stay tuned!</div>
			<img src={avengers} alt="avengers" className="banner__img-avengers" />
		</div>
	);
};

export default AppBanner;