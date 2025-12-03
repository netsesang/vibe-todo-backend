const mongoose = require("mongoose");

// 할 일(Todo) 스키마 정의
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // 반드시 입력
      trim: true,
    },
    isDone: {
      type: Boolean,
      default: false, // 기본값: 아직 안 끝난 상태
    },
  },
  {
    timestamps: true, // createdAt, updatedAt 자동 생성
  }
);

// 컬렉션 이름: "todos"
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;


