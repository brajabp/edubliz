import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PaymentBli } from './payment-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PaymentBli>;

@Injectable()
export class PaymentBliService {

    private resourceUrl =  SERVER_API_URL + 'api/payments';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(payment: PaymentBli): Observable<EntityResponseType> {
        const copy = this.convert(payment);
        return this.http.post<PaymentBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(payment: PaymentBli): Observable<EntityResponseType> {
        const copy = this.convert(payment);
        return this.http.put<PaymentBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PaymentBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PaymentBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<PaymentBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PaymentBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PaymentBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PaymentBli[]>): HttpResponse<PaymentBli[]> {
        const jsonResponse: PaymentBli[] = res.body;
        const body: PaymentBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PaymentBli.
     */
    private convertItemFromServer(payment: PaymentBli): PaymentBli {
        const copy: PaymentBli = Object.assign({}, payment);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(payment.createDate);
        copy.modDate = this.dateUtils
            .convertDateTimeFromServer(payment.modDate);
        return copy;
    }

    /**
     * Convert a PaymentBli to a JSON which can be sent to the server.
     */
    private convert(payment: PaymentBli): PaymentBli {
        const copy: PaymentBli = Object.assign({}, payment);

        copy.createDate = this.dateUtils.toDate(payment.createDate);

        copy.modDate = this.dateUtils.toDate(payment.modDate);
        return copy;
    }
}
