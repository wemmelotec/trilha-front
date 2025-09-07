import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDiretivasAngularMaterial } from './main-diretivas-angular-material';

describe('MainDiretivasAngularMaterial', () => {
  let component: MainDiretivasAngularMaterial;
  let fixture: ComponentFixture<MainDiretivasAngularMaterial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDiretivasAngularMaterial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDiretivasAngularMaterial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
