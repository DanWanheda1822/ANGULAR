import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
   collapse : boolean = false;
    isMdOrLarge : boolean = false;
    filtersMobile : boolean = false;
    filterType: string = "default";
  
  @Output() brandSelected = new EventEmitter<string>();
  @Output() priceSelected = new EventEmitter<string>();
  @Output() categorySelected = new EventEmitter<string>();

    constructor(private elementRef : ElementRef){
      this.checkScreenSize();
    }
  
    @HostListener('window:resize', ['$event'])
    onResize() {
      this.checkScreenSize();
    }
  
    collapseFilter(){
      this.collapse = !this.collapse;
      console.log('status filter', this.collapse);
    }
  
    checkScreenSize() {
      this.isMdOrLarge = window.innerWidth >= 767; 
    }
  
    mobileRenderFilter(selectedFilter: string) {
      if (this.filterType === selectedFilter) {
        // Si es el mismo filtro, alternar entre true y false
        this.filtersMobile = !this.filtersMobile;
      } else {
        // Si es un filtro diferente, mostrarlo siempre
        this.filtersMobile = true;
      }
    
      // Actualizar el filtro seleccionado
      this.filterType = selectedFilter;
    
      console.log('mobile status ---> ', this.filtersMobile);
      console.log('filter type --> ', this.filterType);
    }
    
  
    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.filtersMobile = false;
        console.log('CLICK OUTSIDE THE FILTER')
      }
    }

    sendCategory(event: Event){
      const selectElement = event.target as HTMLSelectElement;
      const optionValue = selectElement.value;
      console.log('CATEGORY IN COMPONENT --->', optionValue);
      this.categorySelected.emit(optionValue);
    }

    sendPrice(event: Event) {
      const selectElement = event.target as HTMLSelectElement;
      const optionValue = selectElement.value; 
      console.log('PRICE OUTSIDE PAGE --->', optionValue);
      this.priceSelected.emit(optionValue); 
  }

    sendBrand(brand: string){
      this.brandSelected.emit(brand);
    }
}
