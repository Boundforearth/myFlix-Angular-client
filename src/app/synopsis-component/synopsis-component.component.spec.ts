import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisComponentComponent } from './synopsis-component.component';

describe('SynopsisComponentComponent', () => {
  let component: SynopsisComponentComponent;
  let fixture: ComponentFixture<SynopsisComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynopsisComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
