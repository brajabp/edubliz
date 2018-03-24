import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ClassLogBli } from './class-log-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ClassLogBli>;

@Injectable()
export class ClassLogBliService {

    private resourceUrl =  SERVER_API_URL + 'api/class-logs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(classLog: ClassLogBli): Observable<EntityResponseType> {
        const copy = this.convert(classLog);
        return this.http.post<ClassLogBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(classLog: ClassLogBli): Observable<EntityResponseType> {
        const copy = this.convert(classLog);
        return this.http.put<ClassLogBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ClassLogBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ClassLogBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClassLogBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClassLogBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ClassLogBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ClassLogBli[]>): HttpResponse<ClassLogBli[]> {
        const jsonResponse: ClassLogBli[] = res.body;
        const body: ClassLogBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ClassLogBli.
     */
    private convertItemFromServer(classLog: ClassLogBli): ClassLogBli {
        const copy: ClassLogBli = Object.assign({}, classLog);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(classLog.createDate);
        copy.modDate = this.dateUtils
            .convertDateTimeFromServer(classLog.modDate);
        return copy;
    }

    /**
     * Convert a ClassLogBli to a JSON which can be sent to the server.
     */
    private convert(classLog: ClassLogBli): ClassLogBli {
        const copy: ClassLogBli = Object.assign({}, classLog);

        copy.createDate = this.dateUtils.toDate(classLog.createDate);

        copy.modDate = this.dateUtils.toDate(classLog.modDate);
        return copy;
    }
}
