import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnChanges {
 

  @Input() public title = 'Sin titulo';
  @Input('labels') public doughnutChartLabels: string[] = ['Label1','Label2','Label3'];
  @Input() public datos: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data: this.datos }],
    };  
  }

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data: [],
        backgroundColor: ['#6857E6','#009FEE','#F02059']
      },
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';
}
