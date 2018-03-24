import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ScheduleBli } from './schedule-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ScheduleBli>;

@Injectable()
export class ScheduleBliService {

    private resourceUrl =  SERVER_API_URL + 'api/schedules';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(schedule: ScheduleBli): Observable<EntityResponseType> {
        const copy = this.convert(schedule);
        return this.http.post<ScheduleBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(schedule: ScheduleBli): Observable<EntityResponseType> {
        const copy = this.convert(schedule);
        return this.http.put<ScheduleBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ScheduleBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ScheduleBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<ScheduleBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ScheduleBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ScheduleBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ScheduleBli[]>): HttpResponse<ScheduleBli[]> {
        const jsonResponse: ScheduleBli[] = res.body;
        const body: ScheduleBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ScheduleBli.
     */
    private convertItemFromServer(schedule: ScheduleBli): ScheduleBli {
        const copy: ScheduleBli = Object.assign({}, schedule);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(schedule.createDate);
        copy.modDate = this.dateUtils
            .convertDateTimeFromServer(schedule.modDate);
        return copy;
    }

    /**
     * Convert a ScheduleBli to a JSON which can be sent to the server.
     */
    private convert(schedule: ScheduleBli): ScheduleBli {
        const copy: ScheduleBli = Object.assign({}, schedule);

        copy.createDate = this.dateUtils.toDate(schedule.createDate);

        copy.modDate = this.dateUtils.toDate(schedule.modDate);
        return copy;
    }
}
