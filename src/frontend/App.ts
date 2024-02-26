
import { GameController } from "./controllers/GameComtroller";
import { GameItem } from "./models/GameItem";

const rootElement :HTMLElement|null =document.querySelector('#app');


var gameApp :GameController |null =null;
if(rootElement){
    gameApp = new GameController([
        new GameItem(1,'','1.png'),
        new GameItem(2,'','2.png'),
        new GameItem(3,'','3.png'),
        new GameItem(4,'','4.png'),
        new GameItem(5,'','5.png'),
        new GameItem(6,'','6.png'), 
        new GameItem(7,'','7.png'),
        new GameItem(8,'','8.png'),
        new GameItem(9,'','9.png'),
        new GameItem(10,'','10.png'),
        new GameItem(11,'','11.png'),
        new GameItem(12,'','12.png'),
    ],rootElement);
    gameApp.renderGameBoard()
};
    
