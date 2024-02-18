import { Component } from '@angular/core';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, TextFieldModule],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css'
})
export class TextComponent {

}
