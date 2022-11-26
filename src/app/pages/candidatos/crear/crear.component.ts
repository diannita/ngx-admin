import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { Candidato } from "../../../modelos/candidato.model";
import { CandidatoService } from "../../../servicios/candidato.service";

@Component({
  selector: "ngx-crear",
  templateUrl: "./crear.component.html",
  styleUrls: ["./crear.component.scss"],
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = false;
  intentoEnvio: boolean = false;
  id_candidato: string = "";
  candidato: Candidato = {
    cedula: "",
    nombre: "",
    apellido: "",
    nombre_resolucion: "",
  };
  constructor(
    private miCandidatoService: CandidatoService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_candidato) {
      this.modoCreacion = false;
      this.id_candidato = this.rutaActiva.snapshot.params.id_candidato;
      this.getCandidato(this.id_candidato);
    } else {
      this.modoCreacion = true;
    }
  }

  getCandidato(id: string) {
    this.miCandidatoService.getCandidato(id).subscribe((data) => {
      this.candidato = data;
    });
  }

  validarDatos(): boolean {
    this.intentoEnvio = true;
    if (
      this.candidato.cedula == "" ||
      this.candidato.nombre == "" ||
      this.candidato.apellido == "" ||
      this.candidato.nombre_resolucion == ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  agregar(): void {
    if (this.validarDatos()) {
      this.intentoEnvio = true;
      this.miCandidatoService.agregar(this.candidato).subscribe((data) => {
        Swal.fire({
          title: "Creando Candidato",
          text: "El candidato se creó de manera correcta!",
          icon: "success",
        });
        this.router.navigate(["pages/candidatos/listar"]);
      });
    }
  }

  editar(): void {
    if (this.validarDatos()) {
      this.miCandidatoService
        .editar(this.candidato._id, this.candidato)
        .subscribe((data) => {
          Swal.fire({
            title: "Editando Candidato",
            text: "El candidato se actualizó de correctamente",
            icon: "success",
          });
          this.router.navigate(["pages/candidatos/listar"]);
        });
    }
  }
}
