import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

const Layout = () =>
    import ('@/pages/layout/index.vue');
const Button = () =>
    import ('@/pages/button/index.vue');
const Bookmark = () =>
    import ('@/pages/bookmark/index.vue');
const Checkbox = () =>
    import ('@/pages/checkbox/index.vue');
const Dropdown = () =>
    import ('@/pages/dropdown/index.vue');
const ScratchCard = () =>
    import ('@/pages/scratch-card/index.vue');
const Slots = () =>
    import ('@/pages/slots/index.vue');
const Tabs = () =>
    import ('@/pages/tabs/index.vue');
const Verification = () =>
    import ('@/pages/verification/index.vue');
const Collapse = () =>
    import ('@/pages/collapse/index.vue');
const Rate = () =>
    import ('@/pages/rate/index.vue');
const Switch = () =>
    import ('@/pages/switch/index.vue');

const routes = [{
        path: '/',
        component: Layout
    },
    {
        path: '/layout',
        meta: {
            title: 'Layout布局'
        },
        component: Layout
    },
    {
        path: '/button',
        meta: {
            title: '按钮'
        },
        component: Button
    },
    {
        path: '/bookmark',
        meta: {
            title: '书签'
        },
        component: Bookmark
    },
    {
        path: '/checkbox',
        meta: {
            title: '复选框'
        },
        component: Checkbox
    },
    {
        path: '/dropdown',
        meta: {
            title: '下拉菜单'
        },
        component: Dropdown
    },
    {
        path: '/slots',
        meta: {
            title: '老虎机'
        },
        component: Slots
    },
    {
        path: '/tabs',
        meta: {
            title: '标签页'
        },
        component: Tabs
    },
    {
        path: '/scratch-card',
        meta: {
            title: '刮刮卡'
        },
        component: ScratchCard
    },
    {
        path: '/verification',
        meta: {
            title: '验证'
        },
        component: Verification
    },
    {
        path: '/collapse',
        meta: {
            title: '折叠面板'
        },
        component: Collapse
    },
    {
        path: '/rate',
        meta: {
            title: 'Rate评分'
        },
        component: Rate
    },
    {
        path: '/switch',
        meta: {
            title: 'switch开关'
        },
        component: Switch
    },
];


const router = new VueRouter({
    routes,
    mode: 'hash'
});


router.beforeEach((to, form, next) => {
    window.document.title = to.meta.title;
    next();
});

export default router;