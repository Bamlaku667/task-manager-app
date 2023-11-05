const asyncWrapper = (routeHandler) => {
  return async (req, res, next) => {
    // try {
    //   await routeHandler(req, res, next);
    // } catch (error) {
    //   next(error);
    // }
    Promise.resolve().then(async () => {
      await routeHandler(req, res, next)
    }).catch(next)

  } ;
};

module.exports = asyncWrapper;

// example controller (routehandler)
// async (req, res) => {
//     let taskId = req.params.id;
//     const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       return res
//         .status(404)
//         .json({ message: `task with id ${taskId} not found` });
//     }
  
//     res.status(200).json({ task });
//   };
  