import Resource from "./Resource";

export default class Call extends Resource {
    async startListenIn(params: {
        access_key: string
        supervisor_key: string
        call_uuid: string
        supervisor_destination: string
        whisper_to_agent?: boolean
    }) {
        return await this.httpClient.post<typeof params, {
            success: boolean
        }>('/call/listen-in/start', params)
    }
}