import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http'; 
import { graphqlProvider } from './app/graphql.provider'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // router outlet for naviagation
    provideHttpClient(withFetch()) , // Apollo server
    ...graphqlProvider, // graphql connection to the backend
  ]
}).catch(err => console.error(err));
