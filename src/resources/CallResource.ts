import Resource from './Resource'

export type CallStartListenInParams = {
    call_uuid: string
    supervisor_destination: string
    supervisor_key: string
    whisper_to_agent?: boolean
}

export type CallStartListenInResponse = {
    success: boolean
}

export class CallResource extends Resource {
    async startListenIn(params: CallStartListenInParams) {
        return await this.httpClient.post<CallStartListenInParams, CallStartListenInResponse>(
            '/call/listen-in/start', params)
    }
}