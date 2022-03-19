import Resource from "./Resource";

export default class RecordCall extends Resource {
    async start(params: {
        access_key: string
        call_uuid: string
    }) {
        return this.httpClient.post<typeof params, {
            recording_uuid: string
        }>('/record-call/start', params)
    }

    async stop(params: {
        access_key: string
        call_uuid: string
    }) {
        return this.httpClient.post<typeof params, {
            call_uuid: string
            recording_uuid: string
        }>('/record-call/stop', params)
    }
}