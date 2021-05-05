import AsyncComponent from '../components/AsyncComponent';

const Home = AsyncComponent( () => import('../pages/Home') );
const Chat = AsyncComponent( () => import('../pages/Chat') );

const routes = [
    {
        name: 'home',
        link: '/',
        component: Home,
        protected: false
    },
    {
        name: 'home',
        link: '/chat',
        component: Chat,
        protected: true
    }
];

export default routes;