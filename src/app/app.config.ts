import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'

// Forms Module
import { ReactiveFormsModule } from '@angular/forms'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'
import { IMAGE_CONFIG } from '@angular/common'


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        // provideClientHydration(),
        provideHttpClient(),
        provideAnimations(), 
        importProvidersFrom(
            ReactiveFormsModule,
        ),
        provideCharts(
            withDefaultRegisterables(),
        ),
        {
            provide: IMAGE_CONFIG,
            useValue: {
                defaultImage: 'assets/images/default-image.png',
                disableImageSizeWarning: true, 
                disableImageLazyLoadWarning: true
            },
        }
    ],
}
