require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRouter = require("./routes/todos");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB 연결 URI - 본인 환경에 맞게 변경하거나 환경변수 MONGODB_URI 사용
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/todo-david";

// 미들웨어
app.use(
  cors({
    origin: true, // 모든 origin 허용 (필요하면 특정 도메인만 허용하도록 변경)
    credentials: true,
  })
);
app.use(express.json());

// 할 일 관련 라우터
app.use("/todos", todoRouter);

// 간단한 헬스 체크용 엔드포인트
app.get("/", (req, res) => {
  res.send("서버가 정상적으로 동작 중입니다.");
});

// 몽고디비 연결 후 서버 시작
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("몽고디비 연결 성공");

    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}번에서 실행 중입니다.`);
    });
  })
  .catch((error) => {
    console.error("몽고디비 연결 실패:", error.message);
    process.exit(1);
  });

