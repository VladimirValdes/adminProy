import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color} from 'ng2-charts';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent implements OnInit {
 

  @Input() title: string = 'Sin Titulo';


  ngOnInit(): void {

  }

    // Doughnut
    @Input('labels') doughnutChartLabels: Label[] = ['data', 'data2', 'data3'];
    @Input('data') doughnutChartData: MultiDataSet = [
      [ 30, 40, 50 ]
    ];

    public colors: Color[] = [
          { backgroundColor: [ '#6857E6', '#009FEE', '#F02059'] }
    ]
  public doughnutChartType: ChartType = 'doughnut';


}
