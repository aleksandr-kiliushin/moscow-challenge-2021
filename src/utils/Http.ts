export class Http {
	private static get requestOptions() {
		return {
			headers: {
				Authorization: 'Bearer ' + localStorage.authToken,
				'Content-Type': 'application/json',
			},
		}
	}

	static async get({ url }: IRequestDataWithoutPayload) {
		const response = await fetch(url, this.requestOptions)
		return await response.json()
	}

	static async post({ payload, url }: IRequestDataWithPayload) {
		const response = await fetch(url, {
			...this.requestOptions,
			body: JSON.stringify(payload),
			method: 'POST',
		})
		return await response.json()
	}

	static async patch({ payload, url }: IRequestDataWithPayload) {
		const response = await fetch(url, {
			...this.requestOptions,
			body: JSON.stringify(payload),
			method: 'PATCH',
		})
		return await response.json()
	}
}

interface IRequestDataWithoutPayload {
	url: string
}

interface IRequestDataWithPayload extends IRequestDataWithoutPayload {
	payload: Record<string, unknown>
}
