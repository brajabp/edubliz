import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EnquiryBli } from './enquiry-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EnquiryBli>;

@Injectable()
export class EnquiryBliService {

    private resourceUrl =  SERVER_API_URL + 'api/enquiries';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(enquiry: EnquiryBli): Observable<EntityResponseType> {
        const copy = this.convert(enquiry);
        return this.http.post<EnquiryBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(enquiry: EnquiryBli): Observable<EntityResponseType> {
        const copy = this.convert(enquiry);
        return this.http.put<EnquiryBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EnquiryBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EnquiryBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<EnquiryBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EnquiryBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EnquiryBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EnquiryBli[]>): HttpResponse<EnquiryBli[]> {
        const jsonResponse: EnquiryBli[] = res.body;
        const body: EnquiryBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EnquiryBli.
     */
    private convertItemFromServer(enquiry: EnquiryBli): EnquiryBli {
        const copy: EnquiryBli = Object.assign({}, enquiry);
        copy.enquiryDate = this.dateUtils
            .convertDateTimeFromServer(enquiry.enquiryDate);
        return copy;
    }

    /**
     * Convert a EnquiryBli to a JSON which can be sent to the server.
     */
    private convert(enquiry: EnquiryBli): EnquiryBli {
        const copy: EnquiryBli = Object.assign({}, enquiry);

        copy.enquiryDate = this.dateUtils.toDate(enquiry.enquiryDate);
        return copy;
    }
}
