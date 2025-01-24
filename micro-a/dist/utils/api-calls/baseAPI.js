"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAPI = void 0;
const axios_1 = require("axios");
class BaseAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    getHeaders(ctx) {
        return {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(ctx && { Authorization: ctx }),
        };
    }
    async get(url, ctx) {
        try {
            const res = await axios_1.default.get(`${this.baseURL}${url}`, {
                headers: this.getHeaders(ctx),
            });
            return res.data;
        }
        catch (err) {
            console.error('GET error:', err.response?.data || err.message);
            throw err;
        }
    }
    async post(url, payload, ctx) {
        try {
            const res = await axios_1.default.post(`${this.baseURL}${url}`, payload, {
                headers: this.getHeaders(ctx),
            });
            return res.data;
        }
        catch (err) {
            console.error('POST error:', err.response?.data || err.message);
            throw err;
        }
    }
    async put(url, payload, ctx) {
        try {
            const res = await axios_1.default.put(`${this.baseURL}${url}`, payload, {
                headers: this.getHeaders(ctx),
            });
            return res.data;
        }
        catch (err) {
            console.error('PUT error:', err.response?.data || err.message);
            throw err;
        }
    }
    async patch(url, payload, ctx) {
        try {
            const res = await axios_1.default.patch(`${this.baseURL}${url}`, payload, {
                headers: this.getHeaders(ctx),
            });
            return res.data;
        }
        catch (err) {
            console.error('PATCH error:', err.response?.data || err.message);
            throw err;
        }
    }
    async delete(url, payload, ctx) {
        try {
            const res = await axios_1.default.delete(`${this.baseURL}${url}`, {
                headers: this.getHeaders(ctx),
                data: payload,
            });
            return res.data;
        }
        catch (err) {
            console.error('DELETE error:', err.response?.data || err.message);
            throw err;
        }
    }
}
exports.BaseAPI = BaseAPI;
//# sourceMappingURL=baseAPI.js.map