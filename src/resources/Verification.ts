import Resource from "./Resource";

export type DocumentType =
    'ALLOCATION_NOTICE'
    | 'IDENTITY_CARD'
    | 'BUSINESS_LICENSE'
    | 'IDENTITY_CARD_AND_BUSINESS_LICENSE'
    | 'CERTIFICATE_OF_REGISTRATION'
    | 'CONTRACT'

export type NumberType = 'GEOGRAPHICAL'

export default class Verification extends Resource {
    async create(params: {
        access_key: string
        area_code: string
        city: string
        country: string
        document_data: string
        document_type: DocumentType
        house_number: string
        street: string
    }) {
        return this.httpClient.post<typeof params, {
            verification_id: string
        }>('/verification/create', params)
    }

    async order(params: {
        access_key: string
        number_type: NumberType
        verification_id: string
        link_to_number?: string
        push_url?: string
        push_secret?: string
    }) {
        return this.httpClient.post<typeof params, {
            order_id: string
        }>('/verification/order', params)
    }
}