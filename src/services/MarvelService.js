

class MarvelService {
	_apiBase = 'https://marvel-server-zeta.vercel.app/';
	_apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';

	getResource = async(url) => {
		let res = await fetch(url);

		if(!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`)
		}

		return await res.json();
	}

	getAllCharacters = async () => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&${this._apiKey}`);
		return res.data.results.map(this._tranformData);
	}

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._tranformData(res.data.results[0]);
	}

	_tranformData = (char) => {
		const descr = char.description.length > 190 ? char.description.slice(1, 190) + '...' : char.description;
		return {
			name: char.name,
			description: descr ? descr : 'No description for this character',
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url
		}
	}
}

export default MarvelService;