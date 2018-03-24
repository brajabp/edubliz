import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EmployeeBli } from './employee-bli.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EmployeeBli>;

@Injectable()
export class EmployeeBliService {

    private resourceUrl =  SERVER_API_URL + 'api/employees';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(employee: EmployeeBli): Observable<EntityResponseType> {
        const copy = this.convert(employee);
        return this.http.post<EmployeeBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(employee: EmployeeBli): Observable<EntityResponseType> {
        const copy = this.convert(employee);
        return this.http.put<EmployeeBli>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EmployeeBli>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EmployeeBli[]>> {
        const options = createRequestOption(req);
        return this.http.get<EmployeeBli[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EmployeeBli[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EmployeeBli = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EmployeeBli[]>): HttpResponse<EmployeeBli[]> {
        const jsonResponse: EmployeeBli[] = res.body;
        const body: EmployeeBli[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EmployeeBli.
     */
    private convertItemFromServer(employee: EmployeeBli): EmployeeBli {
        const copy: EmployeeBli = Object.assign({}, employee);
        copy.createDate = this.dateUtils
            .convertDateTimeFromServer(employee.createDate);
        copy.modDate = this.dateUtils
            .convertDateTimeFromServer(employee.modDate);
        copy.joinDate = this.dateUtils
            .convertDateTimeFromServer(employee.joinDate);
        return copy;
    }

    /**
     * Convert a EmployeeBli to a JSON which can be sent to the server.
     */
    private convert(employee: EmployeeBli): EmployeeBli {
        const copy: EmployeeBli = Object.assign({}, employee);

        copy.createDate = this.dateUtils.toDate(employee.createDate);

        copy.modDate = this.dateUtils.toDate(employee.modDate);

        copy.joinDate = this.dateUtils.toDate(employee.joinDate);
        return copy;
    }
}
