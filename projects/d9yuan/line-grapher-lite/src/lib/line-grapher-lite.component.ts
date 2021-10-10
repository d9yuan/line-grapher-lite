import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { LineGrapherData, LineGrapherMeasurement } from './line-grapher-lite.model';

@Component({
  selector: 'lib-line-grapher-lite',
  templateUrl: './line-grapher-lite.component.html',
  styleUrls: ['./line-grapher-lite.component.scss']
})
export class LineGrapherLiteComponent implements OnInit {
  /** default canvas measurements */
  private readonly defaultCanvasMeasurements: LineGrapherMeasurement = { width: 700, height: 700, margin: 50 };

  /** svg element for d3 */
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | any = null;
  /** svg inner elemnet for d3 */
  private svgInner: d3.Selection<SVGGElement, unknown, null, undefined> | any = null;
  /** svg x-scale for d3 */
  private xScale: any = null;
  /** svg y-scale for d3 */
  private yScale: any = null;
  /** svg x-axis for d3 */
  private xAxis: any = null;
  /** svg y-axis for d3 */
  private yAxis: any = null;
  
  /** data to be graphed */
  @Input() public data: LineGrapherData = { variable: [new Date('2020-01-02'), new Date('2020-01-16')], observations: [[1, 2], [3, 4]] };
  /** measurements of the canvas  */
  @Input() public measurement: LineGrapherMeasurement = this.defaultCanvasMeasurements;

  public constructor(public chartElem: ElementRef) { }

  public ngOnInit(): void {
    this.initializeChart();
    this.drawChart();
  }

  /** Calculates max and min among all observations */
  public extremePoints(observations: number[][], offset: number = 1): [number,  number] {
    const max: number = Math.max(...observations.map((ob: number[]) => Math.max(...ob)));
    const min: number = Math.min(...observations.map((ob: number[]) => Math.min(...ob)));

    return [max + offset, min - offset];
  }

  /** Initialize the canvas */
  private initializeChart(): void {
    // Initialize svg canvas
    this.svg = d3.select(this.chartElem.nativeElement)
                 .select('.line-grapher-line-canvas')
                 .append('svg')
                 .attr('height', this.measurement.height)
                 .attr('width', this.measurement.width);

    // Set inner margin
    this.svgInner = this.svg.append('g')
                            .style('transform', `translate(${this.measurement.margin}px, ${this.measurement.margin}px)`);

    // Calculate and initialize x-axis
    this.xScale = d3.scaleTime().domain(this.data.variable);
    this.xAxis = this.svgInner
                     .append('g')
                     .attr('id', 'x-axis')
                     .style('transform', `translate(0, ${this.measurement.height - 2 * this.measurement.margin}px)`);

    // Calculate and initialize y-axis
    this.yScale = d3.scaleLinear()
                    .domain(this.extremePoints(this.data.observations))
                    .range([0, this.measurement.height - 2 * this.measurement.margin]);
    this.yAxis = this.svgInner.append('g')
                              .attr('id', 'y-axis')
                              .style('transform', `translate(${this.measurement.margin}px,  0)`);
  }

  // Draw the lines on canvas
  private drawChart(): void {
    this.measurement.width = Math.min(this.chartElem.nativeElement.getBoundingClientRect().width, this.measurement.width);
    this.svg.attr('width', this.measurement.width);

    this.xScale.range([this.measurement.margin, this.measurement.width - 2 * this.measurement.margin]);

    const xAxis: any = d3.axisBottom(this.xScale)
                         .ticks(10);

    this.xAxis.call(xAxis);

    const yAxis: any = d3.axisLeft(this.yScale);

    this.yAxis.call(yAxis);

    const line: any = d3.line().x(d => d[0]).y(d => d[1]).curve(d3.curveMonotoneX);
    const colourIterator: string[] = ['red', 'blue', 'green', 'yellow'];
    this.data.observations.forEach((obs: number[], index: number) => {
      /** svg line-group for d3
       *  one line-group for each set of observations
      */
      const lineGroup: any = this.svgInner.append('g')
                                          .append('path')
                                          .attr('id', 'line')
                                          .style('fill', 'none')
                                          .style('stroke', colourIterator[index % colourIterator.length])
                                          .style('stroke-width', '2px');
      const points: [number, number][] = this.data.variable.map((value: Date, index: number) => [
        this.xScale(new Date(value)),
        this.yScale(obs[index]),
      ]);

      lineGroup.attr('d', line(points));
    });
  }

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('data') && this.data) {
      console.log(this.data)
      this.initializeChart();
      this.drawChart();

      window.addEventListener('resize', () => this.drawChart());
    }
  }
}
