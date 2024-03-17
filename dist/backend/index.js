"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Đăng kí view
app.set("view engine", "ejs");
app.set("views", "templates");
// Sử dụng tài nguyên, thư mục bằng link
app.use('/assets', express_1.default.static(path_1.default.join("dist/frontend")));
app.use('/', express_1.default.static(path_1.default.join("public")));
// Xử lí board hiển thị 
app.get("/board", (req, res) => {
    res.render('index', {});
});
app.get("/login", (req, res) => {
    res.render('login', {});
});
// Thêm xử lý cho "/login/board" để redirect về "/login"
app.get("/login/board", (req, res) => {
    res.redirect("/login");
});
app.listen(6060, () => {
    console.log("Server is listening at port 6060");
});
//# sourceMappingURL=index.js.map