import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'

// Forms Module
import { ReactiveFormsModule } from '@angular/forms'


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        provideHttpClient(),
        provideAnimations(), 
        provideClientHydration(),
        importProvidersFrom(
            ReactiveFormsModule,
        ),
    ],
}
