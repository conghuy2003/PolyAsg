
import autobind from "autobind-decorator";
import { GameItem, GameItemStatus } from "../models/GameItem";
import _ from "lodash";

export class GameController {
    private items : GameItem []=[];
    constructor ( items:GameItem[], public element:HTMLElement){
        this.initGame(items);
    }
    initGame(initData :GameItem[]):void{
        for(const item of initData){
            this.items.push(item);
            this.items.push(new GameItem(item.id, item.divId, item.image));
        }
        let id :number= 1;
        this.items.forEach(it =>{
            it.status = GameItemStatus.Close;
            it.divId = 'd'+id;
            id++;
        })

    }
    ///được gọi khi người dùng reset, 
    reinitGame():void{
        this.items.forEach(item=>{
            item.imageElement=null;
            item.status = GameItemStatus.Close;
            item.isMatched = false;
        })
        this.shuffle();

    }
    ///kiểm tra người dùng win game
    isWinGame():boolean{
        return this.items.filter(item=> item.status === GameItemStatus.Open).length=== this.items.length
    }
    ///hiểm thị giao diện
    renderHTML (rootElement :HTMLElement , item:GameItem){
    //     <div class="col-2 gameItem m-2 p1 text-center">
    //     <img src="images/1.png" width="100px" alt="" class="img-fluid">
    // </div>
const divItem:HTMLElement = document.createElement('div');
divItem.className ='col-2 gameItem m-2 p1 text-center';
divItem.id = item.divId;
divItem.addEventListener('click',this.processGameItemClicked);
const imgItem:HTMLImageElement = document.createElement('img');
imgItem.src = `images/${item.image}`;
imgItem.className ='img-fluid invisible';/// ẩn click vào sẽ hiện
item.imageElement =imgItem;
divItem.appendChild(imgItem);
rootElement.appendChild(divItem);


    }
    //hiển thị nút nhấn trong game
    rederResetButton(rootElement:HTMLElement):void{
        let button:HTMLButtonElement = rootElement.querySelector('button#reset')as HTMLButtonElement;
        if (button) {
            button.addEventListener('click',this.processResetButtonClick);
            
        }
    }
    ///hiển thị toàn bộ ndung game
    renderGameBoard():void{
        this.shuffle();
        let boardDiv:HTMLElement  = this.element.querySelector('#board') as HTMLElement;
        if (boardDiv) {
            this.items.forEach(it=>{
                this.renderHTML(boardDiv,it);

            });
            this.rederResetButton(this.element) /// hien thi thong tin cho phep choi lai gamme
        }
    }
    //kiểm tra tp id đưa vào trùn khớp trạng thái mở kh trùng khớp hiện thị đóng
    isMatched(id: number, imgElement:HTMLImageElement):boolean{
        let openedItems :GameItem[] = this.items.filter(item=>{
            if(item.status === GameItemStatus.Open&& !item.isMatched){
                return item;
            }
        });
        if(openedItems.length==2){
            let checkMatchedFilter =openedItems.filter(item =>item.id ==id)

            if (checkMatchedFilter.length <2) 
            /// thay đổi màu nền kh được giống nhau
            {
                openedItems.forEach(item=>{
                    this.changeMatchedBackground(item.imageElement,false);
                });


                setTimeout(()=>
                
                openedItems.forEach(item=>{
                    if (item.imageElement) {
                        item.imageElement.className='img-fluid invisible';
                        /// xoa mau nen truoc khi an di
                        item.status = GameItemStatus.Close;
                        item.isMatched = false;
                        this.changeMatchedBackground(item.imageElement); 
                    }


                }),600);
                
            }else{
                openedItems.forEach(item =>{
                    item.isMatched =true ; /// danh dau tp giong nhau
                    this.changeMatchedBackground(item.imageElement)
                });
                return true;
            };

        }
        return false
    }

    /// thayd đổi màu nền kh đúng hiện sau đó ẩn sau vài giây
    changeMatchedBackground(imgElement:HTMLElement |null , isMatched :boolean =true){
        if (imgElement?.parentElement) {
            if(isMatched){
                imgElement.parentElement.className ='col-2 gameItem m-2 p1 text-center'
            }
            else{
                imgElement.parentElement.className='col-2 gameItem m-2 p1 text-center unmatched'
            }
            
        }
    }
    @autobind
    processGameItemClicked(event:Event){
        let element :HTMLElement |null = event.target as HTMLElement ;
        if ( element.tagName === 'img'){
            element= element.parentElement;
        }
        for (const item of this.items){
            if (item.divId == element?.id && !item.isMatched && item.status ===GameItemStatus.Close){
                item.status =GameItemStatus.Open;
                let imgElement =element.querySelector('img');
                if (imgElement) {
                    imgElement.className ='img-fluid visibl';
                    this.isMatched(item.id,imgElement)
                    
                }
            }

        }
    }
    @autobind
    processResetButtonClick(event:Event):void{
        this.reinitGame();
        const boardElement :HTMLElement = document.querySelector('#board') as HTMLElement;
        boardElement.innerHTML='';
        this.renderGameBoard();
    }
    shuffle(){
        this.items= _.shuffle(this.items);
    }
}