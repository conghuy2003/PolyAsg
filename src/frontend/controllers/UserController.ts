import { validate } from 'class-validator';
import { User } from '../models/User'
import autobind from 'autobind-decorator';
///xử lí sự kiện khi  vào playgame
export class UserController{
    constructor(public element: HTMLElement){
        const button = element.querySelector('#play');

        console.log('UserController constructor');
 /// phương thức xử lí sự kiện khi click button 
        button?.addEventListener('click', this.processPlayButtonClick);
    }
    @autobind 
    processPlayButtonClick(event: Event){
        event.preventDefault();/// ngăn cách pthuc xử lí sự kiện ngầm định của nút

        console.log('event...');

        const form = this.element.querySelector('form') as HTMLFormElement;

        const usernameElement =  this.element.querySelector('#username') as HTMLInputElement;

        const helpId = this.element.querySelector('#UsernameHelpId');

        if(usernameElement){
            let user: User = new User(usernameElement.value);//tồn tại user  và tạo raa dodtuong user truyen vao giá trị khi người dùng input
             ///cho phép kiểm tra ràng buộc dữ liệu user
            validate(user).then(errors=>{
                if(errors.length>0){
                    if(helpId){
                        helpId.className = 'form-text text-muted visible';
                    }
                }else{
                    form.submit();
                }
            })
        }
    }
}