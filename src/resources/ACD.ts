import Resource from "./Resource";

export type AgentState = 'READY' | 'NOT_READY'

export default class ACD extends Resource {
    async retrieveAgentState(params: {
        access_key: string
        email: string
    }) {
        return this.httpClient.get<typeof params, {
            email: string
            state: AgentState
        }>('/acd/agent-state/retrieve', params)
    }

    async changeAgentState(params: {
        access_key: string
        email: string
        nrr?: string
        state: AgentState
    }) {
        return this.httpClient.post<typeof params, {
            success: boolean
        }>('/acd/agent-state/change', params)
    }
}