// fly-in-out.animation.ts
import { trigger, transition, style, animate } from '@angular/animations';

export const flyInOut = trigger('flyInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-100%)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0%)' })),
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-100%)' })),
  ]),
]);
