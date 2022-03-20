import Resource from "./Resource";

export type CallbackStatus =
    'REQUESTED'
    | 'ACCEPTED'
    | 'CALLING_A'
    | 'CALL_A_FAILED'
    | 'CALLING_B'
    | 'CALL_B_FAILED'
    | 'CONNECTED'
    | 'DISCONNECTED'

export class CallbackResource extends Resource {
    async init(params: {
        callback_config_id: string
        callback_number: string
        delay: number
    }) {
        return this.httpClient.post<typeof params, {
            id: string
        }>('/callback/init', params)
    }

    async status(params: {
        id: string
    }) {
        return this.httpClient.post<typeof params, {
            status: CallbackStatus
        }>('/callback/status', params)
    }
}