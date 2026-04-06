import { Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, inject, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input() animationClass = 'animate-fade-up';
  @Input() animationDelay = 0;
  @Input() animationThreshold = 0.15;

  private observer: IntersectionObserver | null = null;
  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.renderer.addClass(this.el.nativeElement, 'scroll-hidden');
    if (this.animationDelay) {
      this.renderer.setStyle(this.el.nativeElement, 'transitionDelay', `${this.animationDelay}ms`);
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.removeClass(this.el.nativeElement, 'scroll-hidden');
            this.renderer.addClass(this.el.nativeElement, this.animationClass);
            this.observer?.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: this.animationThreshold, rootMargin: '0px 0px -50px 0px' }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
