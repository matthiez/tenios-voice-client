export type TeniosResponse<TRequestParams extends {}, TResponse extends {}> = TResponse & {
    error_code?: string
    error_message?: string
    fields?: (keyof TRequestParams)[]
}

export enum Method {
    GET,
    POST,
}

export type RequestPayload = { [k: string]: any }

export type HttpClientOptions = {
    accessKey?: string
    debug?: boolean
    fetch?: typeof fetch
}

export class HttpClient {
    public static readonly BASE_URL = 'https://api.tenios.com'

    constructor(options: HttpClientOptions = {}) {
        this.accessKey = options.accessKey || process.env.TENIOS_ACCESS_KEY
        this.debug = Boolean(options.debug)
        if (options.fetch) this.fetch = fetch
    }

    private _accessKey?: string

    get accessKey() {
        return this._accessKey
    }

    set accessKey(accessKey) {
        this._accessKey = accessKey
    }

    private _debug = false

    get debug() {
        return this._debug
    }

    set debug(debug) {
        this._debug = debug
    }

    private _fetch = fetch

    get fetch() {
        return this._fetch
    }

    set fetch(fetch) {
        this._fetch = fetch
    }

    async get<TParams, TRes>(endpoint: string, payload: RequestPayload): Promise<TeniosResponse<TParams, TRes>> {
        return await this.request(Method.GET, endpoint, payload)
    }

    async post<TParams, TRes>(endpoint: string, payload: RequestPayload): Promise<TeniosResponse<TParams, TRes>> {
        return await this.request(Method.POST, endpoint, payload)
    }

    protected async request<R>(method: Method, endpoint: string, payload: RequestPayload): Promise<R> {
        let url = `${HttpClient.BASE_URL}/${endpoint}`

        if (!this.accessKey) throw new Error('Access token is missing')
        payload.access_key = this.accessKey

        const opts: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: Method[method],
        }

        if (method === Method.GET) {
            const params = new URLSearchParams
            Object.entries(payload).forEach((([k, v]) => params.set(k, v)))
            url += `?${params.toString()}`
        } else opts.body = JSON.stringify(payload)

        const res = await this.fetch(url, opts)
        const body = await res.json()

        if (this.debug) console.debug({
            request: {
                ...opts,
                url,
                body: opts.body instanceof URLSearchParams
                    ? Object.fromEntries(opts.body) : opts.body,
            },
            response: {
                body,
                headers: Object.fromEntries(res.headers),
                status: res.status,
            },
        })

        return body
    }
}
