import Resource from './Resource'

export type CallbackInitParams = {
    callback_config_id: string
    callback_number: string
    delay: number
}

export type CallbackInitResponse = {
    id: string
}

export type CallbackStatus =
    'REQUESTED'
    | 'ACCEPTED'
    | 'CALLING_A'
    | 'CALL_A_FAILED'
    | 'CALLING_B'
    | 'CALL_B_FAILED'
    | 'CONNECTED'
    | 'DISCONNECTED'

export type CallbackStatusParams = {
    id: string
}

export type CallbackStatusResponse = {
    status: CallbackStatus
}

export class CallbackResource extends Resource {
    async init(params: CallbackInitParams) {
        return this.httpClient.post<CallbackInitParams, CallbackInitResponse>('/callback/init', params)
    }

    async status(params: CallbackStatusParams) {
        return this.httpClient.post<CallbackStatusParams, CallbackStatusResponse>('/callback/status', params)
    }
}