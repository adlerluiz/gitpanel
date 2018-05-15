import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTokenComponent } from './check-token.component';

describe('CheckTokenComponent', () => {
  let component: CheckTokenComponent;
  let fixture: ComponentFixture<CheckTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
