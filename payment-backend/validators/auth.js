const validateAuthorization = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const encodedCredentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
    const [username, password] = decodedCredentials.split(':');

    const expectedUsername = process.env.API_USERNAME;
    const expectedPassword = process.env.API_PASSWORD;

    if (username !== expectedUsername || password !== expectedPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    next();
};

module.exports = { validateAuthorization }