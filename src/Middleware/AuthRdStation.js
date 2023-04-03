module.exports = class AuthRdStation {
    async handle(request, response, next) {
        const {auth_rdstation} = request.headers;
        console.log(auth_rdstation)
        request.user_rdstation = auth_rdstation
        next()
    }
}
