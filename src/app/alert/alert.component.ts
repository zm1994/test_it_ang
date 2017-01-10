import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({

  selector: 'alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['./alert.component.css'],
})

export class AlertComponent{
    @Input() alertMessage: string;

    constructor(){}
}