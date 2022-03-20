import {httpClient} from '../utils'
import {WrapUpResource} from '../../src'

const wrapUp = new WrapUpResource(httpClient)

const cancel: WrapUpResource['cancel'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? wrapUp.cancel : jest.fn(async () => ({
        success: true,
    }))

const extend: WrapUpResource['extend'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? wrapUp.extend : jest.fn(async () => ({
        success: true,
        wrap_up_end_time: '1',
    }))

describe('WrapUp', () => {
    it('should successfully cancel', async () => {
        const res = await cancel({
            agent_email: '',
        })
        console.debug(res)
        expect(res.success).toEqual(true)
    })

    it('should successfully extend', async () => {
        const res = await extend({
            agent_email: '',
            end_time: '',
        })
        console.debug(res)
        expect(res.success).toEqual(true)
        expect(res.wrap_up_end_time).toEqual(expect.any(String))
        expect(res.wrap_up_end_time.length > 0).toBeTruthy()
    })
})