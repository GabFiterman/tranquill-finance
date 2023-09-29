/* eslint-disable no-undef */

const errorRes = (res, err, errMsg = 'Failed operation', statusCode = 500) => {
    console.error('ERROR - ErrorRes:', err)
    return res.status(statusCode).json({ success: false, error: errMsg })
}

const notFoundRes = (res, err, errMsg = 'Not Found Document', statusCode = 404) => {
    console.error('ERROR - NotFoundRes:', err)
    return res.status(statusCode).json({ success: false, error: errMsg })
}

const successRes = (res, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({ success: true, data })
}

const createdRes = (res, data = {}, statusCode = 201) => {
    return res.status(statusCode).json({ success: true, data })
}

module.exports = { errorRes, notFoundRes, successRes, createdRes }
