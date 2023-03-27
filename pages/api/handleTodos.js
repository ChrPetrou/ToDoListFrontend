import axios from "axios";

export function handleComplete(req, res) {
  return new Promise(async (resolve, reject) => {
    console.log("hi");
    try {
      const { isCompleted, id } = req.body;
      await axios
        .patch(`http://localhost:4000/todo-list/${id}`, {
          isCompleted: isCompleted,
        })
        .then((res) => res.data);
      resolve();
    } catch {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
      resolve();
    }
  });
}
