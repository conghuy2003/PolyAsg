import express from "express"
import path from "path"
import { Request, Response } from "express";

const app = express(); ////tạo đối tượng
///đăng kí vieww
app.set("view engine", "ejs");
app.set("views", "templates");

/// xử dụng tài nguyên, thư mục bằng link
app.use('/assets', express.static(path.join("dist/frontend")));
app.use('/', express.static(path.join("public")));

/// xử lí board hiển thị 
app.get("/board", (req: Request, res: Response) =>{
    res.render('index', {});
});

app.get("/login", (req: Request, res: Response) =>{
    res.render('login', {});
});

app.listen(6060, () =>{
    console.log("Server is listening at port 6060");
})