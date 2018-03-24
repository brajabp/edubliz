import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { BatchBli } from './batch-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BatchBli>;

@Injectable()
export class BatchBliService {

    private resourceUrl =  SERVER_API_URL + 'api/batches';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(batch: BatchBli): Observable<EntityResponseType> {
        const copy = this.convert(batch);
        return this.http.post<BatchBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(batch: BatchBli): Observable<EntityResponseType> {
        const copy = this.convert(batch);
        return this.http.put<BatchBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BatchBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BatchBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<BatchBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BatchBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BatchBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BatchBli[]>): HttpResponse<BatchBli[]> {
        const jsonResponse: BatchBli[] = res.body;
        const body: BatchBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BatchBli.
     */
    private convertItemFromServer(batch: BatchBli): BatchBli {
        const copy: BatchBli = Object.assign({}, batch);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(batch.createDate);
        copy.modDate = this.dateUtils
            .convertDateTimeFromServer(batch.modDate);
        return copy;
    }

    /**
     * Convert a BatchBli to a JSON which can be sent to the server.
     */
    private convert(batch: BatchBli): BatchBli {
        const copy: BatchBli = Object.assign({}, batch);

        copy.createDate = this.dateUtils.toDate(batch.createDate);

        copy.modDate = this.dateUtils.toDate(batch.modDate);
        return copy;
    }
}
