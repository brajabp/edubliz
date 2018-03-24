import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { FollowUpBli } from './follow-up-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<FollowUpBli>;

@Injectable()
export class FollowUpBliService {

    private resourceUrl =  SERVER_API_URL + 'api/follow-ups';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(followUp: FollowUpBli): Observable<EntityResponseType> {
        const copy = this.convert(followUp);
        return this.http.post<FollowUpBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(followUp: FollowUpBli): Observable<EntityResponseType> {
        const copy = this.convert(followUp);
        return this.http.put<FollowUpBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<FollowUpBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<FollowUpBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<FollowUpBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<FollowUpBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: FollowUpBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<FollowUpBli[]>): HttpResponse<FollowUpBli[]> {
        const jsonResponse: FollowUpBli[] = res.body;
        const body: FollowUpBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to FollowUpBli.
     */
    private convertItemFromServer(followUp: FollowUpBli): FollowUpBli {
        const copy: FollowUpBli = Object.assign({}, followUp);
        copy.followUpDate = this.dateUtils
            .convertDateTimeFromServer(followUp.followUpDate);
        return copy;
    }

    /**
     * Convert a FollowUpBli to a JSON which can be sent to the server.
     */
    private convert(followUp: FollowUpBli): FollowUpBli {
        const copy: FollowUpBli = Object.assign({}, followUp);

        copy.followUpDate = this.dateUtils.toDate(followUp.followUpDate);
        return copy;
    }
}
