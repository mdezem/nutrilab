import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

export interface ICellData {
  text?: string;
  value?: number;
  unit?: string;
  kcal?: number;
  ratio?: number;
  kcalKg?: number;
}

export interface INutritionalTableData extends Array<ICellData[]> {}

export interface IColumnDef {
  name: string;
  label?: string;
  visible?: boolean;
}

@Component({
  selector: 'app-nutritional-table',
  templateUrl: './nutritional-table.component.html',
  styleUrls: ['./nutritional-table.component.scss']
})
export class NutritionalTableComponent implements OnInit {
  @Input() datasource: ICellData[][] | Observable<ICellData[][]> = null;

  @Input() columns: IColumnDef[] = [];

  @ViewChild('valueCell') valueCellTemplate: TemplateRef<any>;

  visibleColumns: string[];

  constructor() {}

  ngOnInit() {
    this.visibleColumns = this.columns
      .filter(c => !(c.visible === false))
      .map(c => c.name);
  }
}
