import { Component, OnInit } from "@angular/core";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "ngx-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.scss"],
})
export class ListarComponent implements OnInit {
  faPlusCircle = faPlusCircle;

  constructor() {}

  ngOnInit(): void {}
}
