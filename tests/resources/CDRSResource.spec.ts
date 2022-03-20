import {httpClient} from '../utils'
import {CDRSResource} from '../../src'

const cdrs = new CDRSResource(httpClient)

const count: CDRSResource['count'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? cdrs.count : jest.fn(async () => ({
        total_items: 0,
    }))

const retrieve: CDRSResource['retrieve'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? cdrs.retrieve : jest.fn(async () => ({
        items: [],
        page: 1,
        page_size: 10,
        total_items: 0,
    }))

describe('CDRS', () => {
    it('should successfully retrieve count', async () => {
        const res = await count({
            start_date_from: '',
            start_date_to: '',
        })
        console.debug({res})
        expect(Number.isInteger(res.total_items)).toEqual(true)
    })

    it('should successfully retrieve items', async () => {
        const params = {
            page: 1,
            page_size: 10,
            start_date_from: '',
            start_date_to: '',
        }
        const res = await retrieve(params)
        console.debug({res})
        expect(Array.isArray(res.items)).toBe(true)
        expect(res.items).toHaveLength(0)
        expect(res.page).toEqual(params.page)
        expect(res.page_size).toEqual(params.page_size)
        expect(Number.isInteger(res.total_items)).toBe(true)
    })
})