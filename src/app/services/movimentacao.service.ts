import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MovimentacaoPayload {
  'Entrada/Saída': string;
  'Data': string;
  'Movimentação': string;
  'Produto': string;
  'Instituição': string;
  'Quantidade': number;
  'Preço unitário': number;
  'Valor da Operação': number;
}

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {
  private apiUrl = 'http://localhost:3000/api/movimentacoes';
  constructor(private http: HttpClient) {}

  criarMovimentacao(payload: MovimentacaoPayload): Observable<any> {
    console.log(`--> [POST] - ${JSON.stringify(payload)}`);
    return this.http.post<any>(this.apiUrl, payload);
  }
}
