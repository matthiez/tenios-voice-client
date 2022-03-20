import {httpClient} from '../utils'
import {VerificationResource} from '../../src'

const verification = new VerificationResource(httpClient)

const create: VerificationResource['create'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? verification.create : jest.fn(async () => ({
        verification_id: '1',
    }))

const order: VerificationResource['order'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? verification.order : jest.fn(async () => ({
        order_id: '1',
    }))

describe('Verification', () => {
    it('should successfully create', async () => {
        const res = await create({
            area_code: '',
            city: '',
            country: '',
            document_data: '',
            document_type: 'ALLOCATION_NOTICE',
            house_number: '',
            street: '',
        })
        console.debug({res})
        expect(res.verification_id).toEqual(expect.any(String))
        expect(res.verification_id.length > 0).toBeTruthy()
    })

    it('should successfully order', async () => {
        const res = await order({
            number_type: 'GEOGRAPHICAL',
            verification_id: '',
            link_to_number: undefined,
            push_url: undefined,
            push_secret: undefined,
        })
        console.debug({res})
        expect(res.order_id).toEqual(expect.any(String))
        expect(res.order_id.length > 0).toBeTruthy()
    })
})