import {ACDResource, AgentState} from '../../src'
import {httpClient} from '../utils'

const acd = new ACDResource(httpClient)

const retrieveAgentState: ACDResource['retrieveAgentState'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? acd.retrieveAgentState : jest.fn(async () => ({
        email: 'test@test.com',
        state: 'NOT_READY' as AgentState
    }))

const changeAgentState: ACDResource['changeAgentState'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? acd.changeAgentState : jest.fn(async () => ({
        success: true,
    }))


describe('ACD', () => {
    it('should successfully retrieve agent state', async () => {
        const params: Parameters<ACDResource['retrieveAgentState']>[0] = {
            email: 'test@test.com'
        }
        const res = await retrieveAgentState(params)
        console.debug({res})
        expect(res.email.length > 0).toEqual(true)
        expect(['NOT_READY', 'READY'] as AgentState[]).toContain(res.state)
    })

    it('should successfully change agent state', async () => {
        const params: Parameters<ACDResource['changeAgentState']>[0] = {
            email: 'test@test.com',
            nrr: undefined,
            state: 'READY',
        }
        const res = await changeAgentState(params)
        console.debug({res})
        expect(res.success).toEqual(true)
    })
})