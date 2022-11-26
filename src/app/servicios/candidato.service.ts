import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Candidato } from "../modelos/candidato.model";
import { Usuario } from "../modelos/usuario.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CandidatoService {
  constructor(private http: HttpClient) {}

  listar(): Observable<Candidato[]> {
    return this.http.get<Candidato[]>(
      `${environment.url_api_gateway}/candidatos`
    );
  }

  eliminar(id: string) {
    return this.http.delete<Candidato>(
      `${environment.url_api_gateway}/candidatos/${id}`
    );
  }

  agregar(candidato: Candidato) {
    return this.http.post(
      `${environment.url_api_gateway}/candidatos`,
      candidato
    );
  }

  editar(id: string, candidato: Candidato) {
    return this.http.put(
      `${environment.url_api_gateway}/candidatos/${id}`,
      Candidato
    );
  }

  getCandidato(id: string): Observable<Candidato> {
    return this.http.get<Candidato>(
      `${environment.url_api_gateway}/candidatos/${id}`
    );
  }
}
