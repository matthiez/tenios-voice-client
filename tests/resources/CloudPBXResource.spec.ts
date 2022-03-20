import {httpClient} from '../utils'
import {CloudPBXResource} from '../../src'

const cloudPBX = new CloudPBXResource(httpClient)

const list: CloudPBXResource['list'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? cloudPBX.list : jest.fn(async () => ({
        items: [],
        success: true,
        total_items: 0,
        page_size: 10,
        page: 1,
    }))

const upsert: CloudPBXResource['upsert'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? cloudPBX.upsert : jest.fn(async () => ({
        success: true,
    }))


describe('CloudPBX', () => {
    it('should successfully retrieve items', async () => {
        const params = {
            page: 1,
            page_size: 10,
        }
        const res = await list(params)
        console.debug({res})
        expect(Array.isArray(res.items)).toBe(true)
        expect(res.items).toHaveLength(0)
        expect(res.success).toBe(true)
        expect(res.page_size).toEqual(params.page_size)
        expect(res.page).toEqual(params.page)
    })

    it('should successfully upsert', async () => {
        const res = await upsert({
            call_history_enabled: true,
            email: undefined,
            first_name: '',
            internal_extension: undefined,
            last_name: '',
            outbound_allowed: true,
            password: '',
            sip_login_enabled: true,
            user_name: '',
        })
        console.debug({res})
        expect(res.success).toEqual(true)
    })
})