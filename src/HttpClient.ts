export type TeniosResponse<TRequestParams extends {}, TResponse extends {}> = TResponse & {
    error_code?: string
    error_message?: string
    fields?: (keyof TRequestParams)[]
}

enum Method {
    GET,
    POST,
}

type RequestPayload = { [k: string]: any }

export default class HttpClient {
    public static readonly BASE_URL = 'https://api.tenios.com'

    constructor(protected options: {
        accessKey?: string
        debug?: boolean
    } = {}) {
        if (!options.accessKey) this.options.accessKey = process.env.TENIOS_ACCESS_KEY
    }

    async get<TParams, TRes>(endpoint: string, payload: RequestPayload): Promise<TeniosResponse<TParams, TRes>> {
        return await this.request(Method.GET, endpoint, payload)
    }

    async post<TParams, TRes>(endpoint: string, payload: RequestPayload): Promise<TeniosResponse<TParams, TRes>> {
        return await this.request(Method.POST, endpoint, payload)
    }

    setAccessKey(apiKey: string) {
        this.options.accessKey = apiKey
    }

    protected async request<R>(method: Method, endpoint: string, payload: RequestPayload): Promise<R> {
        const url = `${HttpClient.BASE_URL}/${endpoint}`

        if (!this.options.accessKey) throw new Error('Access token is missing')
        payload.access_key = this.options.accessKey

        const opts: RequestInit = {
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
            method: Method[method],
        }

        const res = await fetch(url, opts)
        const body = await res.json()

        if (this.options.debug) console.debug({
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
