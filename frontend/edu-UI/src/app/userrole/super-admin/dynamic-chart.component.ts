import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BarRect {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label: string;
  value: number;
  gradientId?: string;
}

interface PieSlice {
  label: string;
  value: number;
  pct: number;
  color: string;
  dasharray: string;
  dashoffset: number;
  startAngle?: number;
  endAngle?: number;
  path?: string;
}

interface DataPoint {
  cx: number;
  cy: number;
  v: number;
  label?: string;
}

@Component({
  selector: 'app-dynamic-chart',
  standalone: true,
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.scss'],
  imports: [CommonModule]
})
export class DynamicChartComponent implements OnChanges, AfterViewInit {
  @Input() type: string = 'bar';
  @Input() data: any = {};
  @Input() animated: boolean = true;
  @Input() showTooltip: boolean = true;

  // State
  hoveredIndex: number = -1;
  tooltipText: string = '';
  tooltipX: number = 0;
  tooltipY: number = 0;
  isInitialized: boolean = false;

  // Chart colors - Modern gradient palette
  readonly colors = [
    { start: '#667eea', end: '#764ba2' },  // Purple gradient
    { start: '#11998e', end: '#38ef7d' },  // Green gradient
    { start: '#fc4a1a', end: '#f7b733' },  // Orange gradient
    { start: '#4facfe', end: '#00f2fe' },  // Blue gradient
    { start: '#f093fb', end: '#f5576c' },  // Pink gradient
    { start: '#5ee7df', end: '#b490ca' },  // Teal-purple gradient
  ];

  readonly solidColors = ['#667eea', '#11998e', '#fc4a1a', '#4facfe', '#f093fb', '#5ee7df'];

  ngAfterViewInit(): void {
    setTimeout(() => this.isInitialized = true, 50);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['type']) {
      this.processData();
    }
  }

  private processData(): void {
    // Add gradient IDs to bar rects
    if (this.barRects) {
      this.barRects.forEach((rect, i) => {
        rect.gradientId = `barGrad${i}`;
      });
    }
  }

  get barRects(): BarRect[] { return this.data?.barRects || []; }
  get pieSlices(): PieSlice[] { return this.data?.pieSlices || []; }
  get attemptsPointsStr(): string { return this.data?.attemptsPointsStr || ''; }
  get attemptPoints(): DataPoint[] { return this.data?.attemptPoints || []; }
  get gaugePathD(): string { return this.data?.gaugePathD || ''; }
  get metricValue(): number | string { return this.data?.metricValue ?? ''; }
  get labels(): string[] { return this.data?.labels || []; }
  get values(): number[] { return this.data?.values || []; }

  // Generate smooth area fill path for line chart
  get areaPath(): string {
    const points = this.attemptPoints;
    if (points.length < 2) return '';
    const start = `M${points[0].cx},60`;
    const lineTo = points.map(p => `L${p.cx},${p.cy}`).join(' ');
    const end = `L${points[points.length - 1].cx},60 Z`;
    return `${start} ${lineTo} ${end}`;
  }

  // Generate smooth curve for line chart  
  get smoothLinePath(): string {
    const points = this.attemptPoints;
    if (points.length < 2) return '';
    
    let path = `M${points[0].cx},${points[0].cy}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.cx + curr.cx) / 2;
      path += ` C${cpx},${prev.cy} ${cpx},${curr.cy} ${curr.cx},${curr.cy}`;
    }
    return path;
  }

  // Generate donut slices as actual arc paths
  get donutSlices(): any[] {
    const slices = this.pieSlices;
    if (!slices.length) return [];
    
    const total = slices.reduce((sum, s) => sum + (s.value || 0), 0) || 1;
    const cx = 50, cy = 50, r = 35;
    let currentAngle = -90; // Start from top

    return slices.map((slice, i) => {
      const pct = (slice.value / total);
      const angle = pct * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);
      
      const largeArc = angle > 180 ? 1 : 0;
      const path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`;
      
      currentAngle = endAngle;
      
      return {
        ...slice,
        path,
        color: this.solidColors[i % this.solidColors.length],
        pct: Math.round(pct * 100)
      };
    });
  }

  // Enhanced gauge calculations
  get gaugeProgress(): number {
    const val = Number(this.metricValue) || 0;
    return Math.min(Math.max(val, 0), 100);
  }

  get gaugeArcPath(): string {
    const progress = this.gaugeProgress / 100;
    const cx = 50, cy = 50, r = 40;
    const startAngle = 135;
    const endAngle = 405;
    const sweep = (endAngle - startAngle) * progress;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = ((startAngle + sweep) * Math.PI) / 180;
    
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    
    const largeArc = sweep > 180 ? 1 : 0;
    return `M${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2}`;
  }

  get gaugeBackgroundPath(): string {
    const cx = 50, cy = 50, r = 40;
    const startAngle = 135;
    const endAngle = 405;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    
    return `M${x1},${y1} A${r},${r} 0 1 1 ${x2},${y2}`;
  }

  get gaugeColor(): string {
    const val = this.gaugeProgress;
    if (val >= 70) return '#10b981';
    if (val >= 40) return '#f59e0b';
    return '#ef4444';
  }

  // Hover handlers
  onBarHover(index: number, rect: BarRect, event: MouseEvent): void {
    this.hoveredIndex = index;
    this.tooltipText = `${rect.label}: ${rect.value}`;
  }

  onBarLeave(): void {
    this.hoveredIndex = -1;
  }

  onPointHover(index: number, point: DataPoint): void {
    this.hoveredIndex = index;
    this.tooltipText = `${point.label || 'Value'}: ${point.v}`;
  }

  onPointLeave(): void {
    this.hoveredIndex = -1;
  }

  onSliceHover(index: number, slice: any): void {
    this.hoveredIndex = index;
    this.tooltipText = `${slice.label}: ${slice.value} (${slice.pct}%)`;
  }

  onSliceLeave(): void {
    this.hoveredIndex = -1;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
