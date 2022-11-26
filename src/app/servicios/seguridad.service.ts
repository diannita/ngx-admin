import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs-compat";
import { environment } from "../../environments/environment";
import { Usuario } from "../modelos/usuario.model";

@Injectable({
  providedIn: "root",
})
export class SeguridadService {
  usuario = new BehaviorSubject<Usuario>(new Usuario());
  constructor(private http: HttpClient, private router: Router) {
    this.verificarSesionActual();
  }

  /** Método para obtener la información del usuario que tiene sesión activa
   * y servirá para acceder al token
   */
  public get usuarioSesionActual(): Usuario {
    return this.usuario.value;
  }

  /** Actualizar el objeto Observable a partir de la información del usuario
   * que se autenticó
   */
  setUsuario(user: Usuario) {
    this.usuario.next(user);
  }

  /** Obtener la información del usuario con datos tales como id y token */
  getUsuario() {
    this.usuario.asObservable();
  }

  /** Realiza la petición de autenticación enviando el correo y la contraseña del login HTML
   * esa información se envía como parámetro en infoUsuario y retorna una respuesta en el return
   */
  login(infoUsuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${environment.url_api_gateway}/login`,
      infoUsuario
    );
    // return this.http.post<Usuario>("http://127.0..0.1:7777/login", infoUsuario);
  }

  /** Guarda el id y el token del usuario autenticado en el localStorage y llama a la función
   * para actualizar la información del usuario que inició sesión
   */
  guardarDatosSesion(datosSesion: any) {
    let sesionActual = localStorage.getItem("sesion");
    let data: Usuario = {
      _id: datosSesion.user_id,
      token: datosSesion.token,
    };
    localStorage.setItem("sesion", JSON.stringify(data));
    this.setUsuario(data);
  }

  /** Cerrar la sesión del usuario elimiando la información de token y id del localStorage
   * y "borrando" la información del usuario que cerró sesión
   */
  logout() {
    localStorage.removeItem("sesion");
    this.setUsuario(new Usuario());
  }

  /** Obtener la información de la sesión activa del usuario guardad en el localStorage */
  getDatosSesion() {
    let sesion = localStorage.getItem("sesion");
    return sesion;
  }

  /** Verificar si actualmente existe un usuario autenticado con información en el localStorage */
  verificarSesionActual() {
    let sesionActual = this.getDatosSesion();
    if (sesionActual) {
      this.setUsuario(JSON.parse(sesionActual));
    }
  }

  /** verifica si existe una sesión activa en el localStorage */
  sesionExiste(): boolean {
    let sesion = this.getDatosSesion();
    return sesion ? true : false;
  }
}
