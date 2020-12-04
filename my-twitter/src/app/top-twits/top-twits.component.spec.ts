import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTwitsComponent } from './top-twits.component';

describe('TopTwitsComponent', () => {
  let component: TopTwitsComponent;
  let fixture: ComponentFixture<TopTwitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopTwitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTwitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
