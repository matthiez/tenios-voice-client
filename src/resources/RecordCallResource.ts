import Resource from "./Resource";

export class RecordCallResource extends Resource {
    async start(params: {
        call_uuid: string
    }) {
        return this.httpClient.post<typeof params, {
            recording_uuid: string
        }>('/record-call/start', params)
    }

    async stop(params: {
        call_uuid: string
    }) {
        return this.httpClient.post<typeof params, {
            call_uuid: string
            recording_uuid: string
        }>('/record-call/stop', params)
    }
}