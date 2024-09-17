import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinternaPage } from './linterna.page';

describe('LinternaPage', () => {
  let component: LinternaPage;
  let fixture: ComponentFixture<LinternaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LinternaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
