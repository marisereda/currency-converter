import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  closeIcon = faCircleXmark;

  constructor(public errorService: ErrorService) {}
}
