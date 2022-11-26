import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbCardModule } from "@nebular/theme";

import { SeguridadRoutingModule } from "./seguridad-routing.module";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SeguridadRoutingModule, NbCardModule, FormsModule],
})
export class SeguridadModule {}
