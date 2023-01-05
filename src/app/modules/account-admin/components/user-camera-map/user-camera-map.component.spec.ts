import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCameraMapComponent } from './user-camera-map.component';

describe('UserCameraMapComponent', () => {
  let component: UserCameraMapComponent;
  let fixture: ComponentFixture<UserCameraMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCameraMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCameraMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
