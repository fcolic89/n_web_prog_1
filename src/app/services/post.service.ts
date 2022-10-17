import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {LDResponse} from "../model";

@Injectable({
  providedIn: 'root'
})
export class PostService{

  url: string = environment.url

  constructor(private httpClient: HttpClient) {}

  // langDetection(text: string, clear: boolean): Observable<LDResponse>{
  //   return this.httpClient.post<LDResponse>(`${this.url}/li/v1`, {
  //     text: text,
  //     clear: clear,
  //     token: localStorage.getItem("token")?.toString()
  //   })
  // }

  langDetection(text: string, clean: boolean): Observable<LDResponse>{

    let token: string = '';
    let tmp: string | null | undefined;

    tmp = localStorage.getItem('token');
    if(tmp === null || tmp === undefined)
      token = '';
    else
      token = tmp.toString()

    const params = new HttpParams()
      .set('text', text)
      .set('clean', clean)
      .set('token',token)

    return this.httpClient.get<LDResponse>(`${this.url}/li/v1/`, {params: params});
  }
}
