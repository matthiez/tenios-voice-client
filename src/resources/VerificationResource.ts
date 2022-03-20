import Resource from './Resource'

export type DocumentType =
    'ALLOCATION_NOTICE'
    | 'IDENTITY_CARD'
    | 'BUSINESS_LICENSE'
    | 'IDENTITY_CARD_AND_BUSINESS_LICENSE'
    | 'CERTIFICATE_OF_REGISTRATION'
    | 'CONTRACT'

export type NumberType = 'GEOGRAPHICAL'

export type VerificationCreateParams = {
    area_code: string
    city: string
    country: string
    document_data: string
    document_type: DocumentType
    house_number: string
    street: string
}

export type VerificationCreateResponse = {
    verification_id: string
}

export type VerificationOrderParams = {
    number_type: NumberType
    verification_id: string
    link_to_number?: string
    push_url?: string
    push_secret?: string
}

export type VerificationOrderResponse = {
    order_id: string
}

export class VerificationResource extends Resource {
    async create(params: VerificationCreateParams) {
        return this.httpClient.post<VerificationCreateParams, VerificationCreateResponse>('/verification/create', params)
    }

    async order(params: VerificationOrderParams) {
        return this.httpClient.post<VerificationOrderParams, VerificationOrderResponse>('/verification/order', params)
    }
}