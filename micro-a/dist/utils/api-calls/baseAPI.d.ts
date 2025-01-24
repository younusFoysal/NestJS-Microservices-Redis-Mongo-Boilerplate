export declare class BaseAPI {
    protected baseURL: string;
    constructor(baseURL: string);
    private getHeaders;
    get<T>(url: string, ctx?: string): Promise<T>;
    post<T>(url: string, payload: unknown, ctx?: string): Promise<T>;
    put<T>(url: string, payload: unknown, ctx?: string): Promise<T>;
    patch<T>(url: string, payload: unknown, ctx?: string): Promise<T>;
    delete<T>(url: string, payload?: unknown, ctx?: string): Promise<T>;
}
