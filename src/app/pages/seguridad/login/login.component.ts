import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "../../../modelos/usuario.model";
import { SeguridadService } from "../../../servicios/seguridad.service";
import Swal from "sweetalert2";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  correo: string = "";
  contrasena: string = "";

  constructor(
    private miServicioSeguridad: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.miServicioSeguridad.logout();
  }

  login(): void {
    let infoUsuario: Usuario = {
      correo: this.correo,
      contrasena: this.contrasena,
    };
    this.miServicioSeguridad.login(infoUsuario).subscribe(
      (data) => {
        this.miServicioSeguridad.guardarDatosSesion(data),
          this.router.navigate(["pages/dashboard"]);
      },
      (error) => {
        Swal.fire({
          title: "Error de autenticación",
          text: error["error"]["message"],
          icon: "error",
          timer: 3000,
        });
      }
    );
  }
}
