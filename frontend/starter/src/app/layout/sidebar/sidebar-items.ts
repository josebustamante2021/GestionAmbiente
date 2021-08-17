import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    moduleName: '',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    role: ['All'],
    submenu: [],
  },

  // Admin Modules
/*
  {
    path: '',
    title: 'Inicio',
    moduleName: 'dashboard',
    iconType: 'material-icons-two-tone',
    icon: 'home',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_Admin','All'],
    submenu: [
      {
        path: '/admin/dashboard/main',
        title: 'MENUITEMS.HOME.LIST.DASHBOARD1',
        moduleName: 'dashboard',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        role: [''],
        submenu: [],
      },
    ],
  },*/
  ,
  {
    path: '/admin/dashboard/main',
    title: 'Inicio',
    moduleName: 'dashboard',
    iconType: 'material-icons-two-tone',
    icon: 'home',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_Admin','All'],
    submenu: []
  },
  {
    path: '/admin/reportes/distribucion',
    title: 'Reportes',
    moduleName: 'reportes',
    iconType: 'material-icons-two-tone',
    icon: 'folder_open',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_Simulacion_Reportes'],
    submenu: []
  },
  {
    path: '/admin/asignacionManual',
    title: 'Asignacion Manual',
    moduleName: 'asignacionManual',
    iconType: 'material-icons-two-tone',
    icon: 'search',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_Simulacion_AsignacionManual'],
    submenu: []
  },
  {
    path: '/admin/simulacion',
    title: 'Simulacion',
    moduleName: 'simulacion',
    iconType: 'material-icons-two-tone',
    icon: 'business',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_Simulacion_Procesar'],
    submenu: []
  },
  {
    path: '/admin/migracion',
    title: 'Migracion',
    moduleName: 'migracion',
    iconType: 'material-icons-two-tone',
    icon: 'cloud',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_Simulacion_Migrar'],
    submenu: []
  },
  /*
  {
    path: '/admin/produccion',
    title: 'Produccion',
    moduleName: 'produccion',
    iconType: 'material-icons-two-tone',
    icon: 'cloud',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_Produccion'],
    submenu: []
  },*/
  {
    path: '/admin/usuarios',
    title: 'Usuarios',
    moduleName: 'usuarios',
    iconType: 'material-icons-two-tone',
    icon: 'people',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['ROLE_Simulacion_Usuarios'],
    submenu: []
  },
  {
    path: '/authentication/logout',
    title: 'Logout',
    moduleName: 'logout',
    iconType: 'material-icons-two-tone',
    icon: 'power_settings_new',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    role: ['All'],
    submenu: [],
  },
];
