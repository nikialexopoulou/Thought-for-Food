import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResComponent } from './search-res.component';

describe('SearchResComponent', () => {
  let component: SearchResComponent;
  let fixture: ComponentFixture<SearchResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
