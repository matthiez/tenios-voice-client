import Resource from './Resource'

export type RecordCallStartParams = {
    call_uuid: string
}

export type RecordCallStartResponse = {
    recording_uuid: string
}

export type RecordCallStopParams = {
    call_uuid: string
}

export type RecordCallStopResponse = {
    call_uuid: string
    recording_uuid: string
}

export class RecordCallResource extends Resource {
    async start(params: RecordCallStartParams) {
        return this.httpClient.post<RecordCallStartParams, RecordCallStartResponse>('/record-call/start', params)
    }

    async stop(params: RecordCallStopParams) {
        return this.httpClient.post<RecordCallStopParams, RecordCallStopResponse>('/record-call/stop', params)
    }
}