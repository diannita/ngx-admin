import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CandidatosRoutingModule } from "./candidatos-routing.module";
import { ListarComponent } from "./listar/listar.component";
import { CrearComponent } from "./crear/crear.component";
import { NbCardModule } from "@nebular/theme";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [ListarComponent, CrearComponent],
  imports: [
    CommonModule,
    CandidatosRoutingModule,
    NbCardModule,
    FormsModule,
    FontAwesomeModule,
  ],
})
export class CandidatosModule {}
