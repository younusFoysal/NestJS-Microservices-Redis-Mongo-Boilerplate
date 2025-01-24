import axios from 'axios';

export class BaseAPI {
	protected baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	private getHeaders(ctx?: string): Record<string, string> {
		return {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...(ctx && { Authorization: ctx }),
		};
	}

	async get<T>(url: string, ctx?: string): Promise<T> {
		try {
			const res = await axios.get<T>(`${this.baseURL}${url}`, {
				headers: this.getHeaders(ctx),
			});
			return res.data;
		} catch (err: any) {
			console.error('GET error:', err.response?.data || err.message);
			throw err;
		}
	}

	async post<T>(url: string, payload: unknown, ctx?: string): Promise<T> {
		try {
			const res = await axios.post<T>(`${this.baseURL}${url}`, payload, {
				headers: this.getHeaders(ctx),
			});
			return res.data;
		} catch (err: any) {
			console.error('POST error:', err.response?.data || err.message);
			throw err;
		}
	}

	async put<T>(url: string, payload: unknown, ctx?: string): Promise<T> {
		try {
			const res = await axios.put<T>(`${this.baseURL}${url}`, payload, {
				headers: this.getHeaders(ctx),
			});
			return res.data;
		} catch (err: any) {
			console.error('PUT error:', err.response?.data || err.message);
			throw err;
		}
	}

	async patch<T>(url: string, payload: unknown, ctx?: string): Promise<T> {
		try {
			const res = await axios.patch<T>(`${this.baseURL}${url}`, payload, {
				headers: this.getHeaders(ctx),
			});
			return res.data;
		} catch (err: any) {
			console.error('PATCH error:', err.response?.data || err.message);
			throw err;
		}
	}

	async delete<T>(url: string, payload?: unknown, ctx?: string): Promise<T> {
		try {
			const res = await axios.delete<T>(`${this.baseURL}${url}`, {
				headers: this.getHeaders(ctx),
				data: payload,
			});
			return res.data;
		} catch (err: any) {
			console.error('DELETE error:', err.response?.data || err.message);
			throw err;
		}
	}
}
