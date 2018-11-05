var mongoose = require('mongoose');

var schema = mongoose.Schema;

var lessonSchema = new schema({
   /*topic:{
      type: Schema.Types.ObjectId,
       require: true,
       ref: "Topic"
   } , */
    subTopic:{
       type: String,
        require: true
    },
    lessonTopic:{
       type: String,
        require: true
    },
    thumbnail:{
       type: String,
        require: true
    },
    videoURL: {
       type: String,
        require: true
    },
    exerciseURL:{
       type: String,
        require: true
    },
    description:{
       type: String,
        require: true
    },
    transcriptURL:{
       type: String,
        require:true
    },
    skillTags: {
       type: String,
        require: true
    },
  /*  teacher:{
       type: Schema.Types.ObjectId,
        require: true
    },*/
    viewCounter: {
       type: Number,
        require: true,
        default: 0
    },
    createdAt: Date,
    updatedAt: Date,
});

Lesson = mongoose.model('Lesson',lessonSchema);

module.exports = Lesson;
