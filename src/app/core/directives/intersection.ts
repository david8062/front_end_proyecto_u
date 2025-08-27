import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appIntersection]',
  standalone: true
})
export class IntersectionDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | undefined;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.renderer.addClass(this.el.nativeElement, 'visible');
            } else {
              this.renderer.removeClass(this.el.nativeElement, 'visible');
            }
          });
        },
        { threshold: 0.5, rootMargin: '0px 0px -10% 0px' }
      );

      this.observer.observe(this.el.nativeElement);
    } else if (this.isBrowser) {
      // Fallback para navegadores viejos (solo si estamos en browser)
      this.renderer.addClass(this.el.nativeElement, 'visible');
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser && this.observer) {
      this.observer.disconnect();
    }
  }
}
