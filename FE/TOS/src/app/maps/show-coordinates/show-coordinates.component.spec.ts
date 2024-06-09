import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCoordinatesComponent } from './show-coordinates.component';

describe('ShowCoordinatesComponent', () => {
  let component: ShowCoordinatesComponent;
  let fixture: ComponentFixture<ShowCoordinatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCoordinatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowCoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
