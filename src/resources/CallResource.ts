import Resource from "./Resource";

export class CallResource extends Resource {
    async startListenIn(params: {
        call_uuid: string
        supervisor_destination: string
        supervisor_key: string
        whisper_to_agent?: boolean
    }) {
        return await this.httpClient.post<typeof params, {
            success: boolean
        }>('/call/listen-in/start', params)
    }
}