import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CourseBli } from './course-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CourseBli>;

@Injectable()
export class CourseBliService {

    private resourceUrl =  SERVER_API_URL + 'api/courses';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(course: CourseBli): Observable<EntityResponseType> {
        const copy = this.convert(course);
        return this.http.post<CourseBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(course: CourseBli): Observable<EntityResponseType> {
        const copy = this.convert(course);
        return this.http.put<CourseBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CourseBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CourseBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<CourseBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CourseBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CourseBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CourseBli[]>): HttpResponse<CourseBli[]> {
        const jsonResponse: CourseBli[] = res.body;
        const body: CourseBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CourseBli.
     */
    private convertItemFromServer(course: CourseBli): CourseBli {
        const copy: CourseBli = Object.assign({}, course);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(course.createDate);
        copy.modDate = this.dateUtils
            .convertDateTimeFromServer(course.modDate);
        return copy;
    }

    /**
     * Convert a CourseBli to a JSON which can be sent to the server.
     */
    private convert(course: CourseBli): CourseBli {
        const copy: CourseBli = Object.assign({}, course);

        copy.createDate = this.dateUtils.toDate(course.createDate);

        copy.modDate = this.dateUtils.toDate(course.modDate);
        return copy;
    }
}
