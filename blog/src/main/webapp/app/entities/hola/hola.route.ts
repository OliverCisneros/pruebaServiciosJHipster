import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { HolaComponent } from './hola.component';
import { HolaDetailComponent } from './hola-detail.component';
import { HolaPopupComponent } from './hola-dialog.component';
import { HolaDeletePopupComponent } from './hola-delete-dialog.component';

export const holaRoute: Routes = [
    {
        path: 'hola',
        component: HolaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.hola.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'hola/:id',
        component: HolaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.hola.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const holaPopupRoute: Routes = [
    {
        path: 'hola-new',
        component: HolaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.hola.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hola/:id/edit',
        component: HolaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.hola.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hola/:id/delete',
        component: HolaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogApp.hola.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
