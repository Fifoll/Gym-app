export default (res, status, message, data) => {
    res.status(status).send({
        status: status,
        message: message,
        data: data
    });
};