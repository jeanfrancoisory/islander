import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopscoreComponent } from './topscore.component';

describe('TopscoreComponent', () => {
  let component: TopscoreComponent;
  let fixture: ComponentFixture<TopscoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopscoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
