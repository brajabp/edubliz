import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DivisionBli } from './division-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DivisionBli>;

@Injectable()
export class DivisionBliService {

    private resourceUrl =  SERVER_API_URL + 'api/divisions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(division: DivisionBli): Observable<EntityResponseType> {
        const copy = this.convert(division);
        return this.http.post<DivisionBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(division: DivisionBli): Observable<EntityResponseType> {
        const copy = this.convert(division);
        return this.http.put<DivisionBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DivisionBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DivisionBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<DivisionBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DivisionBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DivisionBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DivisionBli[]>): HttpResponse<DivisionBli[]> {
        const jsonResponse: DivisionBli[] = res.body;
        const body: DivisionBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DivisionBli.
     */
    private convertItemFromServer(division: DivisionBli): DivisionBli {
        const copy: DivisionBli = Object.assign({}, division);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(division.createDate);
        copy.modDate = this.dateUtils
            .convertDateTimeFromServer(division.modDate);
        return copy;
    }

    /**
     * Convert a DivisionBli to a JSON which can be sent to the server.
     */
    private convert(division: DivisionBli): DivisionBli {
        const copy: DivisionBli = Object.assign({}, division);

        copy.createDate = this.dateUtils.toDate(division.createDate);

        copy.modDate = this.dateUtils.toDate(division.modDate);
        return copy;
    }
}
