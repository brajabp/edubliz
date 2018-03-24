import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StudentBli } from './student-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StudentBli>;

@Injectable()
export class StudentBliService {

    private resourceUrl =  SERVER_API_URL + 'api/students';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(student: StudentBli): Observable<EntityResponseType> {
        const copy = this.convert(student);
        return this.http.post<StudentBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(student: StudentBli): Observable<EntityResponseType> {
        const copy = this.convert(student);
        return this.http.put<StudentBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StudentBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StudentBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<StudentBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StudentBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StudentBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StudentBli[]>): HttpResponse<StudentBli[]> {
        const jsonResponse: StudentBli[] = res.body;
        const body: StudentBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StudentBli.
     */
    private convertItemFromServer(student: StudentBli): StudentBli {
        const copy: StudentBli = Object.assign({}, student);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(student.createDate);
        copy.modDate = this.dateUtils
            .convertDateTimeFromServer(student.modDate);
        return copy;
    }

    /**
     * Convert a StudentBli to a JSON which can be sent to the server.
     */
    private convert(student: StudentBli): StudentBli {
        const copy: StudentBli = Object.assign({}, student);

        copy.createDate = this.dateUtils.toDate(student.createDate);

        copy.modDate = this.dateUtils.toDate(student.modDate);
        return copy;
    }
}
