import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SubjectBli } from './subject-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SubjectBli>;

@Injectable()
export class SubjectBliService {

    private resourceUrl =  SERVER_API_URL + 'api/subjects';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(subject: SubjectBli): Observable<EntityResponseType> {
        const copy = this.convert(subject);
        return this.http.post<SubjectBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(subject: SubjectBli): Observable<EntityResponseType> {
        const copy = this.convert(subject);
        return this.http.put<SubjectBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SubjectBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SubjectBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<SubjectBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SubjectBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SubjectBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SubjectBli[]>): HttpResponse<SubjectBli[]> {
        const jsonResponse: SubjectBli[] = res.body;
        const body: SubjectBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SubjectBli.
     */
    private convertItemFromServer(subject: SubjectBli): SubjectBli {
        const copy: SubjectBli = Object.assign({}, subject);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(subject.createDate);
        copy.modDate = this.dateUtils
            .convertDateTimeFromServer(subject.modDate);
        return copy;
    }

    /**
     * Convert a SubjectBli to a JSON which can be sent to the server.
     */
    private convert(subject: SubjectBli): SubjectBli {
        const copy: SubjectBli = Object.assign({}, subject);

        copy.createDate = this.dateUtils.toDate(subject.createDate);

        copy.modDate = this.dateUtils.toDate(subject.modDate);
        return copy;
    }
}
