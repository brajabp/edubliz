import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ClassroomBli } from './classroom-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ClassroomBli>;

@Injectable()
export class ClassroomBliService {

    private resourceUrl =  SERVER_API_URL + 'api/classrooms';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(classroom: ClassroomBli): Observable<EntityResponseType> {
        const copy = this.convert(classroom);
        return this.http.post<ClassroomBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(classroom: ClassroomBli): Observable<EntityResponseType> {
        const copy = this.convert(classroom);
        return this.http.put<ClassroomBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ClassroomBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ClassroomBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClassroomBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClassroomBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ClassroomBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ClassroomBli[]>): HttpResponse<ClassroomBli[]> {
        const jsonResponse: ClassroomBli[] = res.body;
        const body: ClassroomBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ClassroomBli.
     */
    private convertItemFromServer(classroom: ClassroomBli): ClassroomBli {
        const copy: ClassroomBli = Object.assign({}, classroom);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(classroom.createDate);
        copy.modDate = this.dateUtils
            .convertDateTimeFromServer(classroom.modDate);
        return copy;
    }

    /**
     * Convert a ClassroomBli to a JSON which can be sent to the server.
     */
    private convert(classroom: ClassroomBli): ClassroomBli {
        const copy: ClassroomBli = Object.assign({}, classroom);

        copy.createDate = this.dateUtils.toDate(classroom.createDate);

        copy.modDate = this.dateUtils.toDate(classroom.modDate);
        return copy;
    }
}
