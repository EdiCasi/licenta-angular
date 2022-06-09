import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Material } from './material';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private apiServerUrl = environment.apiBaseUrl + '/material';

  constructor(private http: HttpClient) {}

  public getCourseMaterials(courseId: number): Observable<Material[]> {
    return this.http.get<Material[]>(
      `${this.apiServerUrl}/courseMaterials/${courseId}`
    );
  }
  public getMaterial(materialId: number): Observable<any> {
    const apiurl = `${this.apiServerUrl}/downloadFile/${materialId}`;
    return this.http.get(apiurl, { responseType: 'blob' });
  }
}
