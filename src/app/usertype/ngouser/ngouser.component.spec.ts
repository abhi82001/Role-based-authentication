import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgouserComponent } from './ngouser.component';

describe('NgouserComponent', () => {
  let component: NgouserComponent;
  let fixture: ComponentFixture<NgouserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgouserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
