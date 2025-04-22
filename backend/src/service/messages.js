const sucMessage = {
    insert:'insert success',
    register:'register success',
    login:'login success',
    seeAll:'see all success'
}
const errMessage = {
    insert:'insert fail',
    register:'register fail',
    resgisExist:'register Existed',
    login:'login fail',
    wrongSmt:'login fail wrong email or pass',
    seeAll:'see all failed',
    notMatch:'pass miss match',
    requireField :'all field are require',
    invEmail:'invalid email',
    exists:'Email or phone exist',
    server:'server error'
}
module.exports = {
    sucMessage,
    errMessage
}
