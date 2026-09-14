import { TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from '../widgets';

@Component({
  imports: [RouterOutlet, TuiRoot, Header],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {}
