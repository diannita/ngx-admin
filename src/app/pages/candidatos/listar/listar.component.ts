import { Component, OnInit } from "@angular/core";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CandidatoService } from "../../../servicios/candidato.service";
import { Candidato } from "../../../modelos/candidato.model";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.scss"],
})
export class ListarComponent implements OnInit {
  faUserEdit = faUserEdit;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  candidatos: Candidato[];
  nombresColumnas: string[] = [
    "Cedula",
    "Nombre",
    "Apellido",
    "Nombre Resolucion",
    "Opciones",
  ];

  constructor(
    private miCandidatoService: CandidatoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.miCandidatoService.listar().subscribe(
      (data) => {
        this.candidatos = data;
      },
      (err) => {
        Swal.fire({
          title: "Acceso restringido",
          text: "No tiene permisos para realizar esta acción",
          icon: "error",
        });
        this.router.navigate(["pages/dashboard"]);
      }
    );
  }

  agregar(): void {
    this.router.navigate(["pages/candidatos/crear"]);
  }

  editar(id: string): void {
    this.router.navigate(["pages/candidatos/actualizar/" + id]);
  }

  eliminar(id: string): void {
    Swal.fire({
      title: "Eliminación de Candidatos",
      text: "¿Está seguro de eliminar el Candidato seleccionado?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#74DE30",
      confirmButtonText: "Si, eliminar",
      cancelButtonColor: "#E7461E",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.miCandidatoService.eliminar(id).subscribe((data) => {
          this.ngOnInit();
          Swal.fire({
            title: "Eliminación de candidato",
            text: "El candidato se eliminó correctamente!!",
            icon: "success",
          });
        });
      }
    });
  }
}
