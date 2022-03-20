const mongoose = require("mongoose")

const connect = () =>{
    mongoose.connect("mongodb://localhost:27017/homework_blog",{ignoreUndefined: true}).catch((err)=>{  //mogodb와 연결시 오류가 나면 콘솔창에 띄워준다.
        console.error(err)
    })
}

module.exports = connect //mongodb를 연결한 코드를 모듈로 다른 곳에서 사용가능하게 해준다.