!function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{jkDv:function(t,i,o){"use strict";o.r(i),o.d(i,"AdminModule",function(){return m});var a,r,c,u=o("ofXK"),l=o("tyNb"),d=o("KDUW"),h=o("fXoL"),s=((a=function(){function t(n,i){e(this,t),this.router=n,this.authService=i}var i,o,a;return i=t,(o=[{key:"canActivate",value:function(e,n){var t=e.data.expectedRole;if(t){var i=!1;this.authService.getRoles().includes(t)&&(i=!0),0==i&&this.router.navigate(["/401"])}return!0}}])&&n(i.prototype,o),a&&n(i,a),t}()).\u0275fac=function(e){return new(e||a)(h.rc(l.d),h.rc(d.a))},a.\u0275prov=h.ac({token:a,factory:a.\u0275fac,providedIn:"root"}),a),f=[{path:"dashboard",loadChildren:function(){return Promise.all([o.e(8),o.e(14)]).then(o.bind(null,"pBKm")).then(function(e){return e.DashboardModule})}},{path:"usuarios",canActivate:[s],data:{expectedRole:"ROLE_Simulacion_Usuarios"},loadChildren:function(){return Promise.all([o.e(0),o.e(4),o.e(6),o.e(8),o.e(21)]).then(o.bind(null,"pr3Z")).then(function(e){return e.UsuariosModule})}},{path:"reportes",canActivate:[s],data:{expectedRole:"ROLE_Simulacion_Reportes"},loadChildren:function(){return Promise.all([o.e(0),o.e(2),o.e(4),o.e(5),o.e(1),o.e(20)]).then(o.bind(null,"MnPZ")).then(function(e){return e.ReservaReportesModule})}},{path:"simulacion",canActivate:[s],data:{expectedRole:"ROLE_Simulacion_Procesar"},loadChildren:function(){return Promise.all([o.e(0),o.e(2),o.e(4),o.e(5),o.e(1),o.e(15)]).then(o.bind(null,"vfiY")).then(function(e){return e.SimulacionModule})}},{path:"migracion",canActivate:[s],data:{expectedRole:"ROLE_Simulacion_Migrar"},loadChildren:function(){return Promise.all([o.e(0),o.e(2),o.e(4),o.e(5),o.e(1),o.e(18)]).then(o.bind(null,"qgoE")).then(function(e){return e.MigracionModule})}},{path:"produccion",canActivate:[s],data:{expectedRole:"ROLE_Produccion"},loadChildren:function(){return Promise.all([o.e(0),o.e(2),o.e(6),o.e(1),o.e(19)]).then(o.bind(null,"ImQn")).then(function(e){return e.ProduccionModule})}},{path:"asignacionManual",canActivate:[s],data:{expectedRole:"ROLE_Simulacion_AsignacionManual"},loadChildren:function(){return Promise.all([o.e(0),o.e(2),o.e(6),o.e(1),o.e(17)]).then(o.bind(null,"+cvN")).then(function(e){return e.AsignacionManualModule})}}],p=((c=function n(){e(this,n)}).\u0275fac=function(e){return new(e||c)},c.\u0275mod=h.cc({type:c}),c.\u0275inj=h.bc({imports:[[l.h.forChild(f)],l.h]}),c),m=((r=function n(){e(this,n)}).\u0275fac=function(e){return new(e||r)},r.\u0275mod=h.cc({type:r}),r.\u0275inj=h.bc({imports:[[u.c,p]]}),r)}}])}();