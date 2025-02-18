import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {EEResponse, LDResponse, SAResponse, TSResponse} from "../model";
import {HistoryService} from "./history.service";

@Injectable({
  providedIn: 'root'
})
export class PostService{

  url: string = environment.url

  constructor(private httpClient: HttpClient, private historyService: HistoryService) {}

  // langDetection(text: string, clear: boolean): Observable<LDResponse>{
  //   return this.httpClient.post<LDResponse>(`${this.url}/li/v1`, {
  //     text: text,
  //     clear: clear,
  //     token: localStorage.getItem("token")?.toString()
  //   })
  // }

  langDetection(text: string, clean: boolean): Observable<LDResponse>{

    let token = this.getToken();

    const params = new HttpParams()
      .set('text', text)
      .set('clean', clean)
      .set('token',token)

    this.historyService.addEntry('/li/v1', {'text': text, 'clean': String(clean), 'token': token});
    return this.httpClient.get<LDResponse>(`${this.url}/li/v1/`, {params: params});
  }

  textSimilarity(text1: string, text2: string): Observable<TSResponse>{

    let token = this.getToken();

    const params = new HttpParams()
      .set('text1', text1)
      .set('text2', text2)
      .set('lang', 'en')
      .set('token', token)

    this.historyService.addEntry('/sim/v1', {'text1': text1, 'text2': text2, 'token': token});
    return this.httpClient.get<TSResponse>(`${this.url}/sim/v1/`, {params: params});
  }

  sentimentAnalysis(text: string, lang: string): Observable<SAResponse>{

    let token = this.getToken()

    const params = new HttpParams()
      .set('text', text)
      .set('lang', lang)
      .set('token', token)

    this.historyService.addEntry('/sent/v1', {'text': text, 'lang': lang, 'token': token});
    return this.httpClient.get<SAResponse>(`${this.url}/sent/v1/`, {params: params});
  }

  entityExtraction(text: string, image: boolean, abstraction: boolean, categories: boolean, minConfidence: string): Observable<EEResponse>{

    let token = this.getToken();

    minConfidence = String(parseFloat(minConfidence)/100);

    let include: string = '';
    if(image){
      include += 'image,';
    }
    if(abstraction){
      include += 'abstract,';
    }
    if(categories){
      include += 'categories,';
    }
    include = include.slice(0, -1);

    let params = null;

    if(include === ''){
      params = new HttpParams()
        .set('text', text)
        .set('min_confidence', minConfidence)
        .set('lang', 'en')
        .set('token', token)

      this.historyService.addEntry('/nex/v1', {'text': text, 'lang': 'en','min_confidence': minConfidence,'token': token});
    }else{
      params = new HttpParams()
        .set('text', text)
        .set('include', include)
        .set('min_confidence', minConfidence)
        .set('lang', 'en')
        .set('token', token)

      this.historyService.addEntry('/nex/v1', {'text': text, 'include': include, 'lang': 'en','min_confidence': minConfidence,'token': token});
    }

    return this.httpClient.get<EEResponse>(`${this.url}/nex/v1`, {params: params});
  }

  getToken(): string{
    let tmp: string | null | undefined;

    tmp = localStorage.getItem('token');
    if(tmp === null || tmp === undefined)
      return '';
    else
      return tmp.toString()
  }

}
