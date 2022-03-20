import {httpClient} from '../utils'
import {CallbackResource, CallbackStatus} from '../../src'

const callback = new CallbackResource(httpClient)

const status: CallbackResource['status'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? callback.status : jest.fn(async () => ({
        status: 'REQUESTED' as CallbackStatus,
    }))

const init: CallbackResource['init'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? callback.init : jest.fn(async () => ({
        id: '',
    }))

describe('Callback', () => {
    it('should successfully init callback', async () => {
        const res = await init({
            callback_config_id: '',
            callback_number: '',
            delay: 0,
        })
        console.debug({res})
        expect(res.id).toMatch('')
    })

    it('should successfully return callback status', async () => {
        const res = await status({
            id: '',
        })
        console.debug({res})
        expect(res.status).toMatch('REQUESTED' as CallbackStatus)
    })
})