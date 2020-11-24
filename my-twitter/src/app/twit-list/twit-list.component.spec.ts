import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitListComponent } from './twit-list.component';

describe('TwitListComponent', () => {
  let component: TwitListComponent;
  let fixture: ComponentFixture<TwitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
