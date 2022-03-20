import Resource from './Resource'

export type WrapUpCancelParams = {
    agent_email: string
}

export type WrapUpCancelResponse = {
    success: boolean
}

export type WrapUpExtendParams = {
    agent_email: string
    end_time: string
}

export type WrapUpExtendResponse = {
    success: boolean
    wrap_up_end_time: string
}

export class WrapUpResource extends Resource {
    async cancel(params: WrapUpCancelParams) {
        return this.httpClient.post<WrapUpCancelParams, WrapUpCancelResponse>('/wrap-up/cancel', params)
    }

    async extend(params: WrapUpExtendParams) {
        return this.httpClient.post<WrapUpExtendParams, WrapUpExtendResponse>('/wrap-up/extend', params)
    }
}