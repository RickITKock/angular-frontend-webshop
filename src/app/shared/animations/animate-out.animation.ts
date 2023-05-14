// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';

export const animateOut =
  trigger('animateOut', [
    state('normal', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    state('slideOut', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition('normal => slideOut', [
      animate(400, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ]);
