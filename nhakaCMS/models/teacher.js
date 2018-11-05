var mongoose = require('mongoose');

var schema = mongoose.Schema;

var teacherSchema = new schema({
    title:{
      type: String,
      require: true
    },
   name:{
       type: String,
       require: true
   },
    gender:{
        type: String,
        require: true
    },
    dob:{
        type: Date,
        require: true
    },
    nationality:{
        type: String,
        require: true
    },
    languages:[{
        type: String,
        require: true
    }],
   /* gradesTaught:[{
       //type: Schema.Types.ObjectId,
       //require: true
    }],*/
   /* subjects:[{
        //type: Schema.Types.ObjectId,
        //: true,
        //ref: "Subject"
    }],*/
    createdAt: Date,
    updatedAt: Date
  /*  createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    }*/
  /*  lastmodifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    } */
});

var Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
