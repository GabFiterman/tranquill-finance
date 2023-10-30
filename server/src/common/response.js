/* eslint-disable no-undef */

const errorRes = (
    res,
    errorMessage = 'Failed operation',
    errorType = 'Not classified',
    statusCode = 500,
) => {
    console.error('ERROR - ErrorRes:', errorType);
    return res.status(statusCode).json({ success: false, errorType, errorMessage });
};

const notFoundRes = (
    res,
    errorMessage = 'Cannot found your document, please customize this message.',
    errorType = 'Document not found',
    statusCode = 404,
) => {
    console.error('ERROR - NotFoundRes:', errorType);
    return res.status(statusCode).json({ success: false, errorType, errorMessage });
};

const successRes = (res, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({ success: true, data });
};

const createdRes = (res, data = {}, statusCode = 201) => {
    return res.status(statusCode).json({ success: true, data });
};

module.exports = { errorRes, notFoundRes, successRes, createdRes };
