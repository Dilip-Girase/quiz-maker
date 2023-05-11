import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appQuizHover]'
})
export class QuizHoverDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseover') onMouseOver() {
    this.el.nativeElement.style.backgroundColor = 'green';
    this.el.nativeElement.style.color = 'white';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
    this.el.nativeElement.style.color = 'green';
  }

}
