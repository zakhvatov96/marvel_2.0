import abyss from '../../resources/img/abyss.jpg';

import './charList.scss';

const CharList = () => {
	return (
		<div className="char__list">
			<ul className="char__grid">
				<li className="char__grid-item">
					<img src={abyss} alt="abyss" className="char__grid-item-img" />
					<div className="char__grid-item-name">abyss</div>
				</li>
				<li className="char__grid-item char__grid-item-selected">
					<img src={abyss} alt="abyss" className="char__grid-item-img" />
					<div className="char__grid-item-name">abyss</div>
				</li>
				<li className="char__grid-item">
					<img src={abyss} alt="abyss" className="char__grid-item-img" />
					<div className="char__grid-item-name">abyss</div>
				</li>
				<li className="char__grid-item">
					<img src={abyss} alt="abyss" className="char__grid-item-img" />
					<div className="char__grid-item-name">abyss</div>
				</li>
				<li className="char__grid-item">
					<img src={abyss} alt="abyss" className="char__grid-item-img" />
					<div className="char__grid-item-name">abyss</div>
				</li>
				<li className="char__grid-item">
					<img src={abyss} alt="abyss" className="char__grid-item-img" />
					<div className="char__grid-item-name">abyss</div>
				</li>
				<li className="char__grid-item">
					<img src={abyss} alt="abyss" className="char__grid-item-img" />
					<div className="char__grid-item-name">abyss</div>
				</li>
				<li className="char__grid-item">
					<img src={abyss} alt="abyss" className="char__grid-item-img" />
					<div className="char__grid-item-name">abyss</div>
				</li>
				<li className="char__grid-item">
					<img src={abyss} alt="abyss" className="char__grid-item-img" />
					<div className="char__grid-item-name">abyss</div>
				</li>
			</ul>
			<button className="button button__long button__main"><div className="inner">LOAD MORE</div></button>
		</div>
	);
};

export default CharList;