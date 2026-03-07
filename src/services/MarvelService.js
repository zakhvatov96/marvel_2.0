import useHttp from "../hooks/useHttp";

const useMarvelService = () => {
	const {loading, error, request, clearError} = useHttp();
	
	const _apiBase = 'https://marvel-server-zeta.vercel.app/';
	const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
	const _baseOffset = 0;

	



	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_tranformData);
	}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _tranformData(res.data.results[0]);
	}

	const getAllComics = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_tranformComicsData);
	}

	const _tranformData = (char) => {
		const descr = char.description.length > 190 ? char.description.slice(1, 190) + '...' : char.description;
		return {
			name: char.name,
			description: descr ? descr : 'No description for this character',
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items
		}
	}

	const _tranformComicsData = (comic) => {
		const descr = comic.description.length > 190 ? comic.description.slice(1, 190) + '...' : comic.description;
		return {
			name: comic.title,
			description: descr ? descr : 'No description for this character',
			pages: comic.pageCount,
			thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
			id: comic.id,
			lang: comic.textObjects.languages,
			price: comic.prices[0].price.toFixed(2)
		}
	}

	return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics};
}

export default useMarvelService;