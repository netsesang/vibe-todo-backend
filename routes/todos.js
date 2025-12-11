const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// POST /todos - 할 일 생성
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    // title 필수 체크
    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "title은(는) 필수입니다." });
    }

    const todo = await Todo.create({ title });

    return res.status(201).json(todo);
  } catch (error) {
    console.error("할 일 생성 중 오류:", error);
    return res.status(500).json({ message: "할 일 생성 중 오류가 발생했습니다." });
  }
});

// GET /todos - 할 일 전체 조회
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }); // 최신순 정렬
    return res.status(200).json(todos);
  } catch (error) {
    console.error("할 일 조회 중 오류:", error);
    return res
      .status(500)
      .json({ message: "할 일 조회 중 오류가 발생했습니다." });
  }
});

// PATCH /todos/:id - 할 일 수정
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isDone } = req.body;

    // 업데이트할 내용 유효성 체크
    const update = {};
    if (title !== undefined) {
      if (!title || typeof title !== "string") {
        return res.status(400).json({ message: "title은 문자열이어야 합니다." });
      }
      update.title = title;
    }
    if (isDone !== undefined) {
      if (typeof isDone !== "boolean") {
        return res
          .status(400)
          .json({ message: "isDone은 불리언이어야 합니다." });
      }
      update.isDone = isDone;
    }

    if (Object.keys(update).length === 0) {
      return res
        .status(400)
        .json({ message: "수정할 필드를 최소 한 개 이상 전달해주세요." });
    }

    const todo = await Todo.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).json({ message: "해당 할 일을 찾을 수 없습니다." });
    }

    return res.status(200).json(todo);
  } catch (error) {
    console.error("할 일 수정 중 오류:", error);
    return res
      .status(500)
      .json({ message: "할 일 수정 중 오류가 발생했습니다." });
  }
});

// DELETE /todos/:id - 할 일 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "해당 할 일을 찾을 수 없습니다." });
    }

    return res.status(200).json({ message: "할 일이 삭제되었습니다.", todo });
  } catch (error) {
    console.error("할 일 삭제 중 오류:", error);
    return res
      .status(500)
      .json({ message: "할 일 삭제 중 오류가 발생했습니다." });
  }
});

module.exports = router;


