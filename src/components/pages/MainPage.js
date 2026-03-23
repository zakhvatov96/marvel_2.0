import { useState } from 'react';

import RandomChar from '../randomChar/randomChar';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';
import ErrorBoundary from '../errorBoundary/errorBoundary';

import vision from '../../resources/img/vision.png';

const MainPage = () => {

	const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
      setChar(id);
    }

	return (
		<>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={onCharSelected} />
				</ErrorBoundary>
				<ErrorBoundary>
					<CharInfo charId={selectedChar} />
				</ErrorBoundary>
			</div>
       		 <img src={vision} alt="" className="bg-decoration" />
		</>
	)
}

export default MainPage;