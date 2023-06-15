const user = {
    id: 1,
    username: 'Jon Doe',
    role: 'user',
    email: 'jondoe@email.com',
    password: 'secret_admin',
  };

const validLoginBody = {email: 'admin@admin.com', password: 'secret_admin'};

const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };
const invalidFormatPassword = { email: 'jondoe@email.com', password: 'x' };
const invalidFormatEmail = { email: 'invalid_email', password: '123456' };
const invalidPassword = { email: 'admin@admin.com', password: 'invalid' };
const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg2ODUwNjQ0LCJleHAiOjE2ODcyODI2NDR9.raCB6TSd_4CKJEwb0BeTcAs2gXcq18BsGR5b9HkJonM";
const verifyValid = { id: 1, role: 'admin', iat: 1686850644, exp: 1687282644 }

export {
    validLoginBody,
    userRegistered,
    invalidFormatEmail,
    invalidFormatPassword,
    invalidPassword,
    validToken,
    user,
    verifyValid
}