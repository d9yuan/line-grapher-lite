import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGrapherLiteComponent } from './line-grapher-lite.component';

describe('LineGrapherLiteComponent', () => {
  let component: LineGrapherLiteComponent;
  let fixture: ComponentFixture<LineGrapherLiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineGrapherLiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineGrapherLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
