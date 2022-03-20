import Resource from "./Resource";

export type AgentState = 'NOT_READY' | 'READY'

export class ACDResource extends Resource {
    async retrieveAgentState(params: {
        email: string
    }) {
        return this.httpClient.get<typeof params, {
            email: string
            state: AgentState
        }>('/acd/agent-state/retrieve', params)
    }

    async changeAgentState(params: {
        email: string
        nrr?: string
        state: AgentState
    }) {
        return this.httpClient.post<typeof params, {
            success: boolean
        }>('/acd/agent-state/change', params)
    }
}