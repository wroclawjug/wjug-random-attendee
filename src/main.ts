import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {enableProdMode} from "@angular/core";

if (true) { //TODO: wtf am I doing?
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
