import {HttpClient} from '../src/HttpClient'

describe('HttpClient', () => {
    it('should not have an access token set', () => {
        delete process.env.TENIOS_ACCESS_KEY
        const client = new HttpClient
        expect(client.accessKey).toBeUndefined()
    })

    it('should have an access token set from env', () => {
        const value = 'TEST123'
        process.env.TENIOS_ACCESS_KEY = value
        const client = new HttpClient
        expect(client.accessKey).toEqual(value)
    })

    it('should have an access token set from constructor options', () => {
        const accessKey = '123TEST'
        const client = new HttpClient({accessKey})
        expect(client.accessKey).toEqual(accessKey)
    })

    it('should have debug enabled', () => {
        const debug = true
        const client = new HttpClient({debug})
        expect(client.debug).toEqual(debug)
    })

    it('should have debug disabled', () => {
        const client = new HttpClient
        expect(client.debug).toEqual(false)
    })

    it('should be able to set debug on an instance', () => {
        const client = new HttpClient
        expect(client.debug).toEqual(false)
        client.debug = true
        expect(client.debug).toEqual(true)
    })
})