import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';

const routes: Routes = [
    {//* Una manera de hacer rutas hijas
        path: 'dashboard', 
        component: PagesComponent,
        children : [//*De esta manera se puede hacer que varios componentes compartan un mismo layout
          { path: '', component: DashboardComponent},
          { path: 'progress', component: ProgressComponent},
          { path: 'grafica1', component: Grafica1Component},
        ]
    },//*Estos de acá manejan un layout diferente
];

@NgModule({
    imports: [RouterModule.forChild(routes)],//*Define que las rutas que estarán acá son rutas hijas
    exports: [RouterModule]
})
export class PagesRoutingModule {}