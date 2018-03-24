import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EnrollBli } from './enroll-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EnrollBli>;

@Injectable()
export class EnrollBliService {

    private resourceUrl =  SERVER_API_URL + 'api/enrolls';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(enroll: EnrollBli): Observable<EntityResponseType> {
        const copy = this.convert(enroll);
        return this.http.post<EnrollBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(enroll: EnrollBli): Observable<EntityResponseType> {
        const copy = this.convert(enroll);
        return this.http.put<EnrollBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EnrollBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EnrollBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<EnrollBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EnrollBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EnrollBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EnrollBli[]>): HttpResponse<EnrollBli[]> {
        const jsonResponse: EnrollBli[] = res.body;
        const body: EnrollBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EnrollBli.
     */
    private convertItemFromServer(enroll: EnrollBli): EnrollBli {
        const copy: EnrollBli = Object.assign({}, enroll);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(enroll.createDate);
        copy.modDate = this.dateUtils
            .convertDateTimeFromServer(enroll.modDate);
        return copy;
    }

    /**
     * Convert a EnrollBli to a JSON which can be sent to the server.
     */
    private convert(enroll: EnrollBli): EnrollBli {
        const copy: EnrollBli = Object.assign({}, enroll);

        copy.createDate = this.dateUtils.toDate(enroll.createDate);

        copy.modDate = this.dateUtils.toDate(enroll.modDate);
        return copy;
    }
}
