const mongoose = require("mongoose");

const connect = () => {
  const mongooseId = process.env.MONGO_ID;
  const mongoosepw = process.env.MONGO_PW;
  mongoose
    .connect(`mongodb://${mongooseId}:${mongoosepw}@13.209.89.90:27017/homework_blog?authSource=admin&authMechanism=SCRAM-SHA-1`, { ignoreUndefined: true })
    .catch((err) => {
      //mogodb와 연결시 오류가 나면 콘솔창에 띄워준다.
      console.error(err);
    });
};

module.exports = connect; //mongodb를 연결한 코드를 모듈로 다른 곳에서 사용가능하게 해준다.
