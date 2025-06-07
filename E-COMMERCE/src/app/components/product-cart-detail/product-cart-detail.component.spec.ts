import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartDetailComponent } from './product-cart-detail.component';

describe('ProductCartDetailComponent', () => {
  let component: ProductCartDetailComponent;
  let fixture: ComponentFixture<ProductCartDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCartDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCartDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
