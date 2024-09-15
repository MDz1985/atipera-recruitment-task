import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditElementModalComponent } from './edit-element.modal.component';

describe('EditElementModalComponent', () => {
  let component: EditElementModalComponent;
  let fixture: ComponentFixture<EditElementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditElementModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditElementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
