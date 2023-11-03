const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, 'name can not be morethan 20 characters'],
  },
  completed: {  
    type: Boolean, 
    default: false
  }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
