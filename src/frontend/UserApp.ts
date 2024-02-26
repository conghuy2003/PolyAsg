import { UserController } from './controllers/UserController';
const appElement : HTMLElement = document.querySelector('#app') as HTMLElement;

console.log('login form'); /// hien thi thong tin login 

if (appElement){
    let usercontroller: UserController = new UserController(appElement); /// ton tai doi tuong
}   