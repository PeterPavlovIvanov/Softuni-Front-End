import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitAddComponent } from './twit-add.component';

describe('TwitAddComponent', () => {
  let component: TwitAddComponent;
  let fixture: ComponentFixture<TwitAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
